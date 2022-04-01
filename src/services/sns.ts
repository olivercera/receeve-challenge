const AWS = require('aws-sdk')
import { EventData } from '../models/mailgun';

var sns = new AWS.SNS({ apiVersion: '2010-03-31' })

interface SNSMailgunEvent {
    Provider: string;
    timestamp: number;
    type: string;
}

export class SNSService {

    public publishMessage = async (event: EventData) => {
        const snsMessage: SNSMailgunEvent = {
            Provider: "Mailgun",
            timestamp: event.timestamp,
            type: event.event
        }

        const snsData = {
            TopicArn: process.env.SNS_TOPIC,
            Message: JSON.stringify(snsMessage, null, 2)
        }

        try {
            await sns.publish(snsData).promise();
        } catch (error) {
            console.log("Unable to send message", error)
        }
    }
}
