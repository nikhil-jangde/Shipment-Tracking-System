# Nodemailer-Email-Sender

When an user has to send email using nodemailer he/she has to write a lot of code for the configuration of the nodemailer with the email service(gmail,sendgrid etc.)

This package helps to get rid of that and just takes the necessary arguments as an input and do the same task.

## Note : You must first install nodemailer before using this package
### Installation:
```javascript
npm i nodemailer
```
```javascript
npm i nodemailer-email-sender
```
### Usage:
```javascript
const emailSender=require('nodemailer-email-sender');

emailSender({
    mailService:'gmail', //gmail,sendgrid etc..
    senderUser:'abc', // for email-id abc@gmail.com, username will be abc
    senderEmail:'abc@gmail.com', // sender's email-id
    senderPassword:'12345', // sender's email password
    receiverEmail:'def@gmail.com', // receiver's email address
    subject:'subject', // email subject
    html:'<h1>Body of email</h1>' // email body
    });
console.log("done"); 
```
## Authors:
• [Archan Banerjee](https://github.com/ArchanJS)

• [Jaydip Dey](https://github.com/jaydip1235)