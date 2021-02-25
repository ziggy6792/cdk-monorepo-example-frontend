# #!/bin/bash

# USER_POOL_ID="compapida3444db_userpool_da3444db-compapi"

# RUN=1
# until [ $RUN -eq 0 ] ; do
# echo "Listing users"
# USERS=`aws --profile myProfile cognito-idp list-users  --user-pool-id ${USER_POOL_ID} | grep Username | awk -F: '{print $2}' | sed -e 's/\"//g' | sed -e 's/,//g'`
# if [ ! "x$USERS" = "x" ] ; then
# 	for user in $USERS; do
# 		echo "Deleting user $user"
# 		aws --profile myProfile cognito-idp admin-delete-user --user-pool-id ${USER_POOL_ID} --username ${user}
# 		echo "Result code: $?"
# 		echo "Done"
# 	done
# else
# 	echo "Done, no more users"
# 	RUN=0
# fi
# done

# read -e -p "User Pool Id:" -i "ap-southeast-1_RNMlC2yGY" COGNITO_USER_POOL_ID

COGNITO_USER_POOL_ID="ap-southeast-1_RNMlC2yGY"

aws cognito-idp list-users --user-pool-id $COGNITO_USER_POOL_ID |
  jq -r '.Users | .[] | .Username' |
  while read uname; do
    echo "Deleting $uname"
    aws cognito-idp admin-delete-user --user-pool-id $COGNITO_USER_POOL_ID --username $uname
  done
