#!/bin/bash

aws cloudformation update-stack --stack-name ServerlessEmail --template-body file:///home/jpal/dev/email-resume-be/config.yaml \
--parameters ParameterKey=NameOfRecipient,UsePreviousValue=true \
ParameterKey=S3BucketName,UsePreviousValue=true ParameterKey=HostedZoneName,UsePreviousValue=true \
ParameterKey=ZoneID,UsePreviousValue=true --capabilities CAPABILITY_NAMED_IAM