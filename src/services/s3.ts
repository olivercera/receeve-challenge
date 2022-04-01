const AWS = require('aws-sdk')
var s3 = new AWS.S3()
import { MailgunEvent } from '../models/mailgun';

export class S3Service {
    public storeEventOnS3 = async (event: MailgunEvent) => {

        const Key = `${event['event-data'].id}.json`

        const params = {
            Bucket: process.env.EVENTS_BUCKET,
            Key,
            Body: Buffer.from(JSON.stringify(event))
        }

        try {
            await s3.putObject(params).promise();            
        } catch (error) {
            console.log("Unable to store event on S3", error)
        }

    }
}