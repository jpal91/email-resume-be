#!/bin/bash

BASE_DIR=/home/jpal/dev/email-resume-be
TEMP=$(mktemp -d)
cd $BASE_DIR

cp package.json getEmailsv3.js $TEMP
cd $TEMP

mv getEmailsv3.js index.js

npm install --omit=dev
zip -r getS3lambda.zip *
mv getS3lambda.zip $BASE_DIR/dev-assets

cd $BASE_DIR
rm -r $TEMP