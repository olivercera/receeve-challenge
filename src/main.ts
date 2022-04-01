import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { MailgunService, SNSService, S3Service } from './services';
import { MailgunEvent } from './models/mailgun';

export class MailgunWebhook {

  constructor(
    private mailgunService: MailgunService,
    private SNSService: SNSService,
    private S3Service: S3Service
  ) {

  }

  public handler: APIGatewayProxyHandler = async (event) => {

    const body = JSON.parse(event.body!);
    const mailgunEvent:MailgunEvent = body;

    if (!this.mailgunService.signatureCheck(mailgunEvent.signature)) {
      return {
        statusCode: 403,
        body: JSON.stringify(
          {
            message: 'No proper endpoint call',
          },
          null,
          2
        ),
      };
    }

    await this.S3Service.storeEventOnS3(mailgunEvent);
    await this.SNSService.publishMessage(mailgunEvent['event-data'])

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Hi, this is Oliver, Webhook is working!',
        },
        null,
        2
      ),
    };

  }
}