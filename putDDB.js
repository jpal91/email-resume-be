import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

const client = new DynamoDBClient({ region: 'us-east-1' })
const docClient = DynamoDBDocumentClient.from(client)

const params = {
    TableName: "ResumeEmails",
    Item: {
        email_id: '2',
        number: 1,
        stringEx: 'Thing',
        boolEx: true,
        nested: {
            number: 2,
            stringEx: 'Thing2',
            boolEx: false
        }
    }
}


const run = async () => {
    try {
        const data = await docClient.send(new PutCommand(params))
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}
// run()

const getAll = async () => {
    try {
        const data = await docClient.send(new ScanCommand({ TableName: 'ResumeEmails' }))
        console.log(data)
    } catch (err) {
        console.log(err)
    }
}
getAll()