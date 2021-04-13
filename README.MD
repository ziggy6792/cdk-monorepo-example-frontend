# Alpaca Frontend

## FIRST THINGS FIRST

1. install lerna globally
2. install cdk globally (if you intend to modify to CI/CD pipeline)

## PROJECT STRUCTURE

-   packages/cdk-app configures the CI/CD pipeline
-   packages/web-app frontend react app

## RUNTIME CONFIGURATION

-   Frontend configuration (endpoint urls, environment name...) is configured at runtime using `packages/web-app/public/config/env.json`
-   Create `packages/web-app/public/config/env.json` and paste in the following config to get going. This config will connect frontend to staging apis

```
{
    "ENV": "dev",
    "AWS_REGION": "ap-southeast-1",
    "AWS_COGNITO_IDENDITY_POOL_ID": "ap-southeast-1:6dce3e15-6817-4377-bd82-bb969b254a8f",
    "AWS_USER_POOLS_ID": "ap-southeast-1_RNMlC2yGY",
    "AWS_USER_POOLS_WEB_CLIENT_ID": "1om2i227s52mkpl4t256637ba5",
    "AWS_GRAPHQLENDPOINT_AUTHUSER": "https://l6fheds7c7.execute-api.ap-southeast-1.amazonaws.com/staging/auth-user/graphql",
    "AWS_GRAPHQLENDPOINT_AUTHROLE": "https://l6fheds7c7.execute-api.ap-southeast-1.amazonaws.com/staging/auth-role/graphql",
    "AWS_GRAPHQLENDPOINT_AUTHNONE": "https://l6fheds7c7.execute-api.ap-southeast-1.amazonaws.com/staging/auth-none/graphql",
    "AWS_OATH_DOMAIN": "alpaca-backend-staging.auth.ap-southeast-1.amazoncognito.com"
}
```

## TYPESCRIPT CONFIGURATION

there are 3 tsconfig files in the root of the project.

-   tsconfig.build.json - this is our base tsconfig file that all nested packages extend so we dont have to duplicate all the configs in this one. This tsconfig is used / called whenever we run `yarn run build`
-   tsconfig.json - this extends the above tsconfig. We have one for the entire project and this is configured to give us nice intellisense in VSCODE
-   tsconfig.test.json - this config is used by jest in our jest testing environment

## WEBPACK CONFIGURATION

-   we use webpack to build of our lambdas (not common libraries used in the lambdas, these are built using typescript compiler only)
-   we have a root webpack.config.build.json which all common lambdas extend so we dont have to repeat ourselves.
-   in the root webpack.config, when we build our lambda code, we have to rename the package name of the compiled lambdas in the cdk.out directory and dist folder. This is to avoid naming conflicts when we use lambda as no 2 packages can have the same name.

## MONOREPO CONFIGURATION

-   we use yarn workspaces. you cant use NPM on this project unless you reconfigure lerna and update the package.json to do so
-   all node packages go in /packages directory

## JEST CONFIGURATION

-   we use jest for testing
-   see jest.config.js
-   we need to use ts-jest so that type script plays nicely / gets compiled in our testing environment
-   we configure our tsconfig.build to ignore our test files when we build all of our lambdas to reduce package size and allows us to keep our testing files next to our development files which I like to do to quickly see project coverage.
-   run `yarn run test` or `yarn run test:watch` in root project

## RUNNING CDK COMMANDS

-   to run any cdk commands, you need to first run `cd packages/cdk-app` and run the commands as per usual from there
-   before deploying or synthesizing your final cdk project, you need to build all of your lambdas and other packages. As a convenience method to do this, all packages have a build command in their package.json. You can run `lerna run build` once from the command line to build all these packages, then run `cdk synth` or `cdk deploy` as per usual

## GETTING STARTED

1. clone repo
2. run `yarn install` in project root to install all node dependencies for both root and nested project
3. run `yarn build` to build all typescript code
4. Add runtime configuration (see above)
5. run `yarn start`

## Development cycle

run `yarn run start` to start a local lambda server
see utils folder for how to add / remove lambdas from the server
read https://steveholgado.com/aws-lambda-local-development/ for more information

## Adding a lambda to cdk

1. create your new lambda in packages directory
2. run `lerna add {new lambda package name} --scope @alpaca-frontend/cdk-app` this will add the new lambda to your cdk project. This isnt required but it make referencing the lambda folder directory easier in the following step
3. add your lambda to your cdk stack as per usual, the important part to change is where to reference the lambda code:

```
new lambda.Function(this, 'lambda-a', {
	functionName: 'lambda-a',
	memorySize: 256,
	runtime: lambda.Runtime.NODEJS_12_X,
	handler: 'index.handler',
	code: lambda.Code.fromAsset(
		path.join(
			require.resolve('@alpaca-frontend/lambda-a'),
			'..'
		)
	),

})
```

## FIRST DEPLOY

1. yarn install
2. lerna run build
3. cd packages/cdk-app
4. cdk bootstrap
5. cdk deploy

## Useful commands

`lerna run build --scope @alpaca-frontend/lambda-a` can run this anywhere inside of project to build only one lambda, useful if only building and deploying an update to one lambda so that you dont have to build all other lambdas before dpeloy as project grows

`lerna add @alpaca-frontend/common-lambda-lib --scope @alpaca-frontend/lambda-a` - if you need to ever add one of your local packages (common-lambda-lib) to another local package (lambda-a), this will do the trick and update lambda-a's package.json to add the dependency

## Gotcha's

-   its important to always reference the /dist/ directory when importing files from common libraries...
-   if you make an edit to your common lambda library, you will have to rebuild all the packages that use this dependency... best to run `lerna run build` in this use case
-   sometimes the typescript compiler caches builds which can lead to unexpected results, especially if you change your tsconfig. To remedy this, run `lerna run clean:light` to delete the cache file and then `lerna run build` to rebuild
-   when adding devDependencies to the project, in most cases you will want to add them to the root project instead of the newsted packages... read up on lerna about this, specifically dev dependencies that have command line binaries
