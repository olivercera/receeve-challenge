# Receeve Code Challenge - Oliver Cera

Using Serverless framework I created an AWS Stack:

It creates Webhook/endpoint for Mailgun events (validating comes from Mailgun) stores raw events on S3 and send the event to SNS topic.
Noticed that that SNS topic is not having any subscription by default. 

On the **Security** side, I also use SSM to avoid exposing api keys on the code/repo.

## Install 

Just run `npm i` on the main folder to install all the needed dependencies

## Create SSM Parameter for the project

Go to SSM (https://console.aws.amazon.com/systems-manager/parameters) and create a new parameter called `receeve-olivercera-mailgunApiKey` and set this to your Mailgun Api Key

## Deployment

Just run the command `serverless deploy`

if you have several AWS accounts on your computer use:

`serverless deploy --aws-profile YOUR-PROFILE`

Once it is deployed you will have an url, to setup your mailgun webhook

it would be something like https://abc123.execute-api.us-region.amazonaws.com/mailgun/webhook


## Taking implementation to next level

Some improvement that could be achieve that I didn't right now but I had in mind

- Implement **AWS Secrets Manager** to store API Keys or any other sensitive data, Versus current implementation storing it on environment variable
- Ask for ARN of SNS, if provided use it otherwise create it on this stack
- Add an initial SNS Subscription on this stack 
- If data needs to be searchable Amazon Athena can be used, and using the already stored json files can be used with AWS Glue for this.
- Implement Glacier after X days on files stored on S3, using an S3 lifecycle rule
- Implement CI/CD