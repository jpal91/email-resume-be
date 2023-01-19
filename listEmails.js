import { simpleParser } from "mailparser";
import { S3Client, ListObjectsCommand, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-east-1" })

const getEmail = async (key) => {
    const params = {
        Bucket: 'resume-inbox',
        Key: key
    }

    try {
        const data = await client.send(new GetObjectCommand(params))
        return parseEmail(await data.Body.transformToString())


    } catch (err) {
        throw err
    }
}

const parseEmail = async (bytes) => {

    const { html, text, textAsHtml, subject, date, to, from, messageId } = await simpleParser(bytes)
    return { html, text, textAsHtml, subject, date, to, from, messageId }

}

export const run = async () => {
    const params = {
        Bucket: "resume-inbox",
        Prefix: "Email"
    }
    const res = []
    
    try {
        const data = await client.send(new ListObjectsCommand(params))

        const arr = data.Contents.slice(1)
        

        for (let i = 0; i < arr.length; i++) {
            const key = arr[i].Key
            
            await getEmail(key)
                .then((r) => {
                    res.push(r)
                })
        }
        
    } catch (err) {
        return {
            status: 500,
            body: err
        }
    }
    
    return {
        status: 200,
        body: JSON.stringify(res)
    }
}

run()