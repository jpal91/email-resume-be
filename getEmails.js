import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Buffer } from 'buffer'

const client = new S3Client({ region: 'us-east-1' })

export const handler = async(event) => {
    // TODO implement
    const message = JSON.parse(event.Records[0].Sns.Message)
    const base = Buffer.from(message.content, 'base64')
    message.content = base.toString('utf8')
    
    const params = {
        Bucket: 'resume-inbox',
        Key: 'email.json',
        Body: JSON.stringify(message)
    }
    
    await client.send(new PutObjectCommand(params))
    const response = {
        statusCode: 200,
        body: 'Done',
    };
    return response;
};