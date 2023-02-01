import { simpleParser } from "mailparser";
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'

const client = new S3Client({ region: 'us-east-1' })

export const handler = async (event) => {
    const bucket = event.bucketName
    const key = event.keyName

    if (!bucket || !key) return

    const params = {
        Bucket: bucket,
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

    const stringDate = String(date)

    const response = {
        statusCode: 200,
        body: JSON.stringify({ html, text, textAsHtml, subject, stringDate, to, from, messageId })
    }

    return response
}