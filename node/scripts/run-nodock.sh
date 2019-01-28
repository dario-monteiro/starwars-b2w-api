#!/bin/bash

SCRIPT="$1"

if [[ ${PROJECT_PATH:0:1} = "/" ]]; then
    export PROJECT_PATH=$PROJECT_PATH
else
    export PROJECT_PATH="/opt/app/"$PROJECT_PATH
fi

cd $PROJECT_PATH
cd ..
rm -rf *

su -c "git clone $GIT_REPO" -s /bin/bash www-app

chown -R www-app:www-app $PROJECT_PATH

su -c "cd $PROJECT_PATH; npm i --force" -s /bin/bash www-app

su -c "cd $PROJECT_PATH; $SCRIPT" -s /bin/bash www-app
