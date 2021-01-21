# https://unix.stackexchange.com/questions/129391/passing-named-arguments-to-shell-scripts
# parse paramters
while [ $# -gt 0 ]; do
   case "$1" in
   --env=*)
      env="${1#*=}"
      ;;
   *)
      printf "***************************\n"
      printf "* Error: Invalid argument.*\n"
      printf "***************************\n"
      exit 1
      ;;
   esac
   shift
done

if [ -z $env ]; then
   echo "env not set"
   exit 1
fi

printf "Argument env is %s\n" "$env"

if [ $env = "dummy" ]; then
   invokeLambda=cdk-monorepo-backend-config-frontend-dummy
   ssmFrontendConfig=/cdk-monorepo-backend/staging/frontend-config
elif [ $env = "prod" ]; then
   invokeLambda=cdk-monorepo-backend-config-frontend-prod
   ssmFrontendConfig=/cdk-monorepo-backend/prod/frontend-config
elif [ $env = "staging" ]; then
   invokeLambda=cdk-monorepo-backend-config-frontend-prod
   ssmFrontendConfig=/cdk-monorepo-backend/prod/frontend-config
else
   echo "env invalid"
   exit 1
fi

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"

lambdaOutput=${DIR}/bin/output.json

payload='{"detail": { "name": "'$ssmFrontendConfig'", "type": "String", "operation": "Update" }}'

echo "ssmFrontendConfig: $ssmFrontendConfig"
echo "invokeLambda: $invokeLambda"
echo ""
echo "payload: $payload"
echo ""

aws lambda invoke \
   --function-name $invokeLambda \
   --payload "$payload" \
   $lambdaOutput
