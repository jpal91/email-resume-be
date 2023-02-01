#!/bin/bash

aws cloudformation create-stack --stack-name ServerlessEmail --template-body file:///home/jpal/dev/email-resume-be/config.yaml \
--parameters ParameterKey=EmailIdentityName,ParameterValue="myserverlessemail.info" ParameterKey=NameOfRecipient,ParameterValue="justin@myserverlessemail.info" \
ParameterKey=S3BucketName,ParameterValue="serverless-email-8080" ParameterKey=HostedZoneName,ParameterValue="myserverlessemail.info" \
ParameterKey=ZoneID,ParameterValue="Z09510269JSPHJGKHXSG" --capabilities CAPABILITY_NAMED_IAM