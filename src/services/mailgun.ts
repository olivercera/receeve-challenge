import { Signature } from '../models/mailgun';
import { createHmac } from 'crypto';

export class MailgunService {
    public signatureCheck = (signature: Signature): boolean => {
        const signingKey: string = process.env.MAILGUN_API_KEY || "";
        const encodedToken = createHmac('sha256', signingKey)
            .update(signature.timestamp.concat(signature.token))
            .digest('hex')

        return (encodedToken === signature.signature)
    };
}