"use strict";
/**
 *  Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiAuthApiGatewayLambda = void 0;
const api = require("@aws-cdk/aws-apigateway");
const defaults = require("@aws-solutions-constructs/core");
const core_1 = require("@aws-cdk/core");
var RESOURCE_TYPE;
(function (RESOURCE_TYPE) {
    RESOURCE_TYPE["INERNAL"] = "internal";
    RESOURCE_TYPE["EXTERNAL"] = "external";
    RESOURCE_TYPE["UNPROTECTED"] = "unprotetected";
})(RESOURCE_TYPE || (RESOURCE_TYPE = {}));
class MultiAuthApiGatewayLambda extends core_1.Construct {
    /**
     * @summary Constructs a new instance of the MultiAuthApiGatewayLambda class.
     * @param {cdk.App} scope - represents the scope for all the resources.
     * @param {string} id - this is a a scope-unique id.
     * @param {MultiAuthApiGatewayLambdaProps} props - user provided props for the construct
     * @since 0.8.0
     * @access public
     */
    constructor(scope, id, props) {
        super(scope, id);
        this.lambdaFunction = defaults.buildLambdaFunction(this, {
            existingLambdaObj: props.existingLambdaObj,
            lambdaFunctionProps: props.lambdaFunctionProps,
        });
        [this.apiGateway, this.apiGatewayCloudWatchRole, this.apiGatewayLogGroup] = defaults.GlobalLambdaRestApi(this, this.lambdaFunction, props.apiGatewayProps);
        this.userPool = defaults.buildUserPool(this, props.cognitoUserPoolProps);
        this.userPoolClient = defaults.buildUserPoolClient(this, this.userPool, props.cognitoUserPoolClientProps);
        this.apiGatewayAuthorizer = new api.CfnAuthorizer(this, 'CognitoAuthorizer', {
            restApiId: this.apiGateway.restApiId,
            type: api.AuthorizationType.COGNITO,
            providerArns: [this.userPool.userPoolArn],
            identitySource: 'method.request.header.Authorization',
            name: 'cognito-authorizer',
        });
        this.externalResource = this.apiGateway.root.addResource(RESOURCE_TYPE.EXTERNAL);
        this.internalResource = this.apiGateway.root.addResource(RESOURCE_TYPE.INERNAL);
        this.unprotectedResource = this.apiGateway.root.addResource(RESOURCE_TYPE.UNPROTECTED);
    }
    addAuthorizers() {
        this.apiGateway.methods.forEach((apiMethod) => {
            if (apiMethod.resource.path.startsWith(`/${RESOURCE_TYPE.EXTERNAL}`)) {
                this.addCognitoAuthorizer(apiMethod);
            }
            else if (apiMethod.resource.path.startsWith(`/${RESOURCE_TYPE.INERNAL}`)) {
                this.addIamAuthorizer(apiMethod);
            }
            else {
                this.addNoAuthorizer(apiMethod);
            }
        });
    }
    addNoAuthorizer(apiMethod) {
        const child = apiMethod.node.findChild('Resource');
        child.addPropertyOverride('AuthorizationType', api.AuthorizationType.NONE);
    }
    addCognitoAuthorizer(apiMethod) {
        // Leave the authorizer NONE for HTTP OPTIONS method to support CORS, for the rest set it to COGNITO
        const child = apiMethod.node.findChild('Resource');
        if (apiMethod.httpMethod === 'OPTIONS') {
            child.addPropertyOverride('AuthorizationType', api.AuthorizationType.NONE);
        }
        else {
            child.addPropertyOverride('AuthorizationType', api.AuthorizationType.COGNITO);
            child.addPropertyOverride('AuthorizerId', { Ref: this.apiGatewayAuthorizer.logicalId });
        }
    }
    addIamAuthorizer(apiMethod) {
        // Leave the authorizer NONE for HTTP OPTIONS method to support CORS, for the rest set it to COGNITO
        const child = apiMethod.node.findChild('Resource');
        if (apiMethod.httpMethod === 'OPTIONS') {
            child.addPropertyOverride('AuthorizationType', api.AuthorizationType.NONE);
        }
        else {
            child.addPropertyOverride('AuthorizationType', api.AuthorizationType.IAM);
        }
    }
}
exports.MultiAuthApiGatewayLambda = MultiAuthApiGatewayLambda;
exports.default = MultiAuthApiGatewayLambda;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGktYXV0aC1hcGlnYXRld2F5LWxhbWJkYS50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm11bHRpLWF1dGgtYXBpZ2F0ZXdheS1sYW1iZGEudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7OztHQVdHOzs7QUFFSCwrQ0FBK0M7QUFLL0MsMkRBQTJEO0FBQzNELHdDQUEwQztBQXNDMUMsSUFBSyxhQUlKO0FBSkQsV0FBSyxhQUFhO0lBQ2hCLHFDQUFzQixDQUFBO0lBQ3RCLHNDQUF1QixDQUFBO0lBQ3ZCLDhDQUErQixDQUFBO0FBQ2pDLENBQUMsRUFKSSxhQUFhLEtBQWIsYUFBYSxRQUlqQjtBQUVELE1BQWEseUJBQTBCLFNBQVEsZ0JBQVM7SUFhdEQ7Ozs7Ozs7T0FPRztJQUNILFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBcUM7UUFDN0UsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUU7WUFDdkQsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLGlCQUFpQjtZQUMxQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsbUJBQW1CO1NBQy9DLENBQUMsQ0FBQztRQUNILENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUMzSixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3pFLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENB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QkFBbUIsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUU7YUFBTTtZQUNMLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDO0NBQ0Y7QUFsRkQsOERBa0ZDO0FBRUQsa0JBQWUseUJBQXlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICBDb3B5cmlnaHQgMjAyMCBBbWF6b24uY29tLCBJbmMuIG9yIGl0cyBhZmZpbGlhdGVzLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLiBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4gKiAgd2l0aCB0aGUgTGljZW5zZS4gQSBjb3B5IG9mIHRoZSBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbiAqXG4gKiAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICBvciBpbiB0aGUgJ2xpY2Vuc2UnIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuICdBUyBJUycgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFU1xuICogIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXG4gKiAgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIGFwaSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gJ0Bhd3MtY2RrL2F3cy1jb2duaXRvJztcbmltcG9ydCB7IExvZ0dyb3VwIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWxvZ3MnO1xuaW1wb3J0ICogYXMgaWFtIGZyb20gJ0Bhd3MtY2RrL2F3cy1pYW0nO1xuaW1wb3J0ICogYXMgZGVmYXVsdHMgZnJvbSAnQGF3cy1zb2x1dGlvbnMtY29uc3RydWN0cy9jb3JlJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ0Bhd3MtY2RrL2NvcmUnO1xuXG4vKipcbiAqIEBzdW1tYXJ5IFRoZSBwcm9wZXJ0aWVzIGZvciB0aGUgTXVsdGlBdXRoQXBpR2F0ZXdheUxhbWJkYSBDb25zdHJ1Y3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBNdWx0aUF1dGhBcGlHYXRld2F5TGFtYmRhUHJvcHMge1xuICAvKipcbiAgICogRXhpc3RpbmcgaW5zdGFuY2Ugb2YgTGFtYmRhIEZ1bmN0aW9uIG9iamVjdCwgaWYgdGhpcyBpcyBzZXQgdGhlbiB0aGUgbGFtYmRhRnVuY3Rpb25Qcm9wcyBpcyBpZ25vcmVkLlxuICAgKlxuICAgKiBAZGVmYXVsdCAtIE5vbmVcbiAgICovXG4gIHJlYWRvbmx5IGV4aXN0aW5nTGFtYmRhT2JqPzogbGFtYmRhLkZ1bmN0aW9uO1xuICAvKipcbiAgICogVXNlciBwcm92aWRlZCBwcm9wcyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdCBwcm9wcyBmb3IgdGhlIExhbWJkYSBmdW5jdGlvbi5cbiAgICpcbiAgICogQGRlZmF1bHQgLSBEZWZhdWx0IHByb3BzIGFyZSB1c2VkXG4gICAqL1xuICByZWFkb25seSBsYW1iZGFGdW5jdGlvblByb3BzPzogbGFtYmRhLkZ1bmN0aW9uUHJvcHM7XG4gIC8qKlxuICAgKiBPcHRpb25hbCB1c2VyIHByb3ZpZGVkIHByb3BzIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0IHByb3BzIGZvciB0aGUgQVBJIEdhdGV3YXkuXG4gICAqXG4gICAqIEBkZWZhdWx0IC0gRGVmYXVsdCBwcm9wcyBhcmUgdXNlZFxuICAgKi9cbiAgcmVhZG9ubHkgYXBpR2F0ZXdheVByb3BzPzogYXBpLkxhbWJkYVJlc3RBcGlQcm9wcyB8IGFueTtcbiAgLyoqXG4gICAqIE9wdGlvbmFsIHVzZXIgcHJvdmlkZWQgcHJvcHMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgcHJvcHNcbiAgICpcbiAgICogQGRlZmF1bHQgLSBEZWZhdWx0IHByb3BzIGFyZSB1c2VkXG4gICAqL1xuICByZWFkb25seSBjb2duaXRvVXNlclBvb2xQcm9wcz86IGNvZ25pdG8uVXNlclBvb2xQcm9wcztcbiAgLyoqXG4gICAqIE9wdGlvbmFsIHVzZXIgcHJvdmlkZWQgcHJvcHMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHQgcHJvcHNcbiAgICpcbiAgICogQGRlZmF1bHQgLSBEZWZhdWx0IHByb3BzIGFyZSB1c2VkXG4gICAqL1xuICByZWFkb25seSBjb2duaXRvVXNlclBvb2xDbGllbnRQcm9wcz86IGNvZ25pdG8uVXNlclBvb2xDbGllbnRQcm9wcyB8IGFueTtcbn1cblxuZW51bSBSRVNPVVJDRV9UWVBFIHtcbiAgJ0lORVJOQUwnID0gJ2ludGVybmFsJyxcbiAgJ0VYVEVSTkFMJyA9ICdleHRlcm5hbCcsXG4gICdVTlBST1RFQ1RFRCcgPSAndW5wcm90ZXRlY3RlZCcsXG59XG5cbmV4cG9ydCBjbGFzcyBNdWx0aUF1dGhBcGlHYXRld2F5TGFtYmRhIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IHVzZXJQb29sOiBjb2duaXRvLlVzZXJQb29sO1xuICBwdWJsaWMgcmVhZG9ubHkgdXNlclBvb2xDbGllbnQ6IGNvZ25pdG8uVXNlclBvb2xDbGllbnQ7XG4gIHB1YmxpYyByZWFkb25seSBhcGlHYXRld2F5OiBhcGkuUmVzdEFwaTtcbiAgcHVibGljIHJlYWRvbmx5IGFwaUdhdGV3YXlDbG91ZFdhdGNoUm9sZTogaWFtLlJvbGU7XG4gIHB1YmxpYyByZWFkb25seSBhcGlHYXRld2F5TG9nR3JvdXA6IExvZ0dyb3VwO1xuICBwdWJsaWMgcmVhZG9ubHkgYXBpR2F0ZXdheUF1dGhvcml6ZXI6IGFwaS5DZm5BdXRob3JpemVyO1xuICBwdWJsaWMgcmVhZG9ubHkgbGFtYmRhRnVuY3Rpb246IGxhbWJkYS5GdW5jdGlvbjtcblxuICBwdWJsaWMgcmVhZG9ubHkgZXh0ZXJuYWxSZXNvdXJjZTogYXBpLlJlc291cmNlO1xuICBwdWJsaWMgcmVhZG9ubHkgaW50ZXJuYWxSZXNvdXJjZTogYXBpLlJlc291cmNlO1xuICBwdWJsaWMgcmVhZG9ubHkgdW5wcm90ZWN0ZWRSZXNvdXJjZTogYXBpLlJlc291cmNlO1xuXG4gIC8qKlxuICAgKiBAc3VtbWFyeSBDb25zdHJ1Y3RzIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBNdWx0aUF1dGhBcGlHYXRld2F5TGFtYmRhIGNsYXNzLlxuICAgKiBAcGFyYW0ge2Nkay5BcHB9IHNjb3BlIC0gcmVwcmVzZW50cyB0aGUgc2NvcGUgZm9yIGFsbCB0aGUgcmVzb3VyY2VzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSB0aGlzIGlzIGEgYSBzY29wZS11bmlxdWUgaWQuXG4gICAqIEBwYXJhbSB7TXVsdGlBdXRoQXBpR2F0ZXdheUxhbWJkYVByb3BzfSBwcm9wcyAtIHVzZXIgcHJvdmlkZWQgcHJvcHMgZm9yIHRoZSBjb25zdHJ1Y3RcbiAgICogQHNpbmNlIDAuOC4wXG4gICAqIEBhY2Nlc3MgcHVibGljXG4gICAqL1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogTXVsdGlBdXRoQXBpR2F0ZXdheUxhbWJkYVByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIHRoaXMubGFtYmRhRnVuY3Rpb24gPSBkZWZhdWx0cy5idWlsZExhbWJkYUZ1bmN0aW9uKHRoaXMsIHtcbiAgICAgIGV4aXN0aW5nTGFtYmRhT2JqOiBwcm9wcy5leGlzdGluZ0xhbWJkYU9iaixcbiAgICAgIGxhbWJkYUZ1bmN0aW9uUHJvcHM6IHByb3BzLmxhbWJkYUZ1bmN0aW9uUHJvcHMsXG4gICAgfSk7XG4gICAgW3RoaXMuYXBpR2F0ZXdheSwgdGhpcy5hcGlHYXRld2F5Q2xvdWRXYXRjaFJvbGUsIHRoaXMuYXBpR2F0ZXdheUxvZ0dyb3VwXSA9IGRlZmF1bHRzLkdsb2JhbExhbWJkYVJlc3RBcGkodGhpcywgdGhpcy5sYW1iZGFGdW5jdGlvbiwgcHJvcHMuYXBpR2F0ZXdheVByb3BzKTtcbiAgICB0aGlzLnVzZXJQb29sID0gZGVmYXVsdHMuYnVpbGRVc2VyUG9vbCh0aGlzLCBwcm9wcy5jb2duaXRvVXNlclBvb2xQcm9wcyk7XG4gICAgdGhpcy51c2VyUG9vbENsaWVudCA9IGRlZmF1bHRzLmJ1aWxkVXNlclBvb2xDbGllbnQodGhpcywgdGhpcy51c2VyUG9vbCwgcHJvcHMuY29nbml0b1VzZXJQb29sQ2xpZW50UHJvcHMpO1xuXG4gICAgdGhpcy5hcGlHYXRld2F5QXV0aG9yaXplciA9IG5ldyBhcGkuQ2ZuQXV0aG9yaXplcih0aGlzLCAnQ29nbml0b0F1dGhvcml6ZXInLCB7XG4gICAgICByZXN0QXBpSWQ6IHRoaXMuYXBpR2F0ZXdheS5yZXN0QXBpSWQsXG4gICAgICB0eXBlOiBhcGkuQXV0aG9yaXphdGlvblR5cGUuQ09HTklUTyxcbiAgICAgIHByb3ZpZGVyQXJuczogW3RoaXMudXNlclBvb2wudXNlclBvb2xBcm5dLFxuICAgICAgaWRlbnRpdHlTb3VyY2U6ICdtZXRob2QucmVxdWVzdC5oZWFkZXIuQXV0aG9yaXphdGlvbicsXG4gICAgICBuYW1lOiAnY29nbml0by1hdXRob3JpemVyJyxcbiAgICB9KTtcblxuICAgIHRoaXMuZXh0ZXJuYWxSZXNvdXJjZSA9IHRoaXMuYXBpR2F0ZXdheS5yb290LmFkZFJlc291cmNlKFJFU09VUkNFX1RZUEUuRVhURVJOQUwpO1xuICAgIHRoaXMuaW50ZXJuYWxSZXNvdXJjZSA9IHRoaXMuYXBpR2F0ZXdheS5yb290LmFkZFJlc291cmNlKFJFU09VUkNFX1RZUEUuSU5FUk5BTCk7XG4gICAgdGhpcy51bnByb3RlY3RlZFJlc291cmNlID0gdGhpcy5hcGlHYXRld2F5LnJvb3QuYWRkUmVzb3VyY2UoUkVTT1VSQ0VfVFlQRS5VTlBST1RFQ1RFRCk7XG4gIH1cblxuICBwdWJsaWMgYWRkQXV0aG9yaXplcnMoKSB7XG4gICAgdGhpcy5hcGlHYXRld2F5Lm1ldGhvZHMuZm9yRWFjaCgoYXBpTWV0aG9kKSA9PiB7XG4gICAgICBpZiAoYXBpTWV0aG9kLnJlc291cmNlLnBhdGguc3RhcnRzV2l0aChgLyR7UkVTT1VSQ0VfVFlQRS5FWFRFUk5BTH1gKSkge1xuICAgICAgICB0aGlzLmFkZENvZ25pdG9BdXRob3JpemVyKGFwaU1ldGhvZCk7XG4gICAgICB9IGVsc2UgaWYgKGFwaU1ldGhvZC5yZXNvdXJjZS5wYXRoLnN0YXJ0c1dpdGgoYC8ke1JFU09VUkNFX1RZUEUuSU5FUk5BTH1gKSkge1xuICAgICAgICB0aGlzLmFkZElhbUF1dGhvcml6ZXIoYXBpTWV0aG9kKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYWRkTm9BdXRob3JpemVyKGFwaU1ldGhvZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZE5vQXV0aG9yaXplcihhcGlNZXRob2Q6IGFwaS5NZXRob2QpIHtcbiAgICBjb25zdCBjaGlsZCA9IGFwaU1ldGhvZC5ub2RlLmZpbmRDaGlsZCgnUmVzb3VyY2UnKSBhcyBhcGkuQ2ZuTWV0aG9kO1xuICAgIGNoaWxkLmFkZFByb3BlcnR5T3ZlcnJpZGUoJ0F1dGhvcml6YXRpb25UeXBlJywgYXBpLkF1dGhvcml6YXRpb25UeXBlLk5PTkUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDb2duaXRvQXV0aG9yaXplcihhcGlNZXRob2Q6IGFwaS5NZXRob2QpIHtcbiAgICAvLyBMZWF2ZSB0aGUgYXV0aG9yaXplciBOT05FIGZvciBIVFRQIE9QVElPTlMgbWV0aG9kIHRvIHN1cHBvcnQgQ09SUywgZm9yIHRoZSByZXN0IHNldCBpdCB0byBDT0dOSVRPXG4gICAgY29uc3QgY2hpbGQgPSBhcGlNZXRob2Qubm9kZS5maW5kQ2hpbGQoJ1Jlc291cmNlJykgYXMgYXBpLkNmbk1ldGhvZDtcbiAgICBpZiAoYXBpTWV0aG9kLmh0dHBNZXRob2QgPT09ICdPUFRJT05TJykge1xuICAgICAgY2hpbGQuYWRkUHJvcGVydHlPdmVycmlkZSgnQXV0aG9yaXphdGlvblR5cGUnLCBhcGkuQXV0aG9yaXphdGlvblR5cGUuTk9ORSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkLmFkZFByb3BlcnR5T3ZlcnJpZGUoJ0F1dGhvcml6YXRpb25UeXBlJywgYXBpLkF1dGhvcml6YXRpb25UeXBlLkNPR05JVE8pO1xuICAgICAgY2hpbGQuYWRkUHJvcGVydHlPdmVycmlkZSgnQXV0aG9yaXplcklkJywgeyBSZWY6IHRoaXMuYXBpR2F0ZXdheUF1dGhvcml6ZXIubG9naWNhbElkIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYWRkSWFtQXV0aG9yaXplcihhcGlNZXRob2Q6IGFwaS5NZXRob2QpIHtcbiAgICAvLyBMZWF2ZSB0aGUgYXV0aG9yaXplciBOT05FIGZvciBIVFRQIE9QVElPTlMgbWV0aG9kIHRvIHN1cHBvcnQgQ09SUywgZm9yIHRoZSByZXN0IHNldCBpdCB0byBDT0dOSVRPXG4gICAgY29uc3QgY2hpbGQgPSBhcGlNZXRob2Qubm9kZS5maW5kQ2hpbGQoJ1Jlc291cmNlJykgYXMgYXBpLkNmbk1ldGhvZDtcbiAgICBpZiAoYXBpTWV0aG9kLmh0dHBNZXRob2QgPT09ICdPUFRJT05TJykge1xuICAgICAgY2hpbGQuYWRkUHJvcGVydHlPdmVycmlkZSgnQXV0aG9yaXphdGlvblR5cGUnLCBhcGkuQXV0aG9yaXphdGlvblR5cGUuTk9ORSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNoaWxkLmFkZFByb3BlcnR5T3ZlcnJpZGUoJ0F1dGhvcml6YXRpb25UeXBlJywgYXBpLkF1dGhvcml6YXRpb25UeXBlLklBTSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE11bHRpQXV0aEFwaUdhdGV3YXlMYW1iZGE7XG4iXX0=