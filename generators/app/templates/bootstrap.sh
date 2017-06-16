#!bin/bash

set -e

while [ "`ls -A $1`" = "" ]
do
  echo sleeping
  sleep 1
done
echo "`ls -A $1`"

cp -r $1 /usr/share/nginx/html

nginx -g "daemon off;"


