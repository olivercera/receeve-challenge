import { MailgunWebhook } from './main';
import { MailgunService, SNSService, S3Service } from './services';

export const webhook = async (event, context, cb) => {
    const mgSvc = new MailgunService();
    const snsSvc = new SNSService();
    const s3Svc = new S3Service();

    const lambda = new MailgunWebhook(mgSvc, snsSvc, s3Svc);
    return lambda.handler(event, context, cb);
};