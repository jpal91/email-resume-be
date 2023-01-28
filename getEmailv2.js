import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb'
import { simpleParser } from "mailparser";

const client = new S3Client({ region: 'us-east-1' })
const ddbClient = new DynamoDBClient({ region: 'us-east-1' })
const docClient = DynamoDBDocumentClient.from(ddbClient)

export const handler = async(event) => {
    const key = event.Records.s3.object.key
    
    const params = {
        Bucket: 'resume-inbox-v2',
        Key: key
    }
    
    let s3object
    
    try {
        s3object = await client.send(new GetObjectCommand(params))
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify(err)
        }
    }
    
    const emailRaw = await s3object.Body.transformToString()
    const { html, text, textAsHtml, subject, date, to, from, messageId } = await simpleParser(emailRaw)
    
    const ddbParams = {
        TableName: 'ResumeEmails',
        Item: {
            email_id: messageId,
            html: html,
            text: text,
            textAsHtml: textAsHtml,
            subject: subject,
            date: date,
            to: to,
            from: from
        }
    }
    
    try {
        const res = await docClient.send(new PutCommand(ddbParams))
        console.log(res)
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify(err)
        }
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Done'),
    };
    return response;
};
