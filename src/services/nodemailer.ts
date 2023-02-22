import nodemailer, { Transporter } from 'nodemailer';
import crypto from 'crypto';

export class Mailer {
    private transporter: Transporter;

    constructor(private host: string, private port: number, private user: string, private pass: string) {
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure: true,
            auth: {
                user,
                pass,
            },
        });
    }

    async sendActivationLink(to: string, key: string) {

        const subject = 'Activation Link';
        const text = `Click the following link to activate your account: ${key}`;

        const info = await this.transporter.sendMail({
            from: this.user,
            to,
            subject,
            text:"activation linc",
            html: `
      <h1>Welcome!</h1>
      <p>Please use the following link to activate your account:</p>
      <a href=http://localhost:3000/api/activation/${key}>Clicl here </a>
      <p>Thank you for joining!</p>
    `,
        });


    }
    async sendNewpassword(to: string, password:string) {

        const subject = 'reset password ';


        const info = await this.transporter.sendMail({
            from: this.user,
            to,
            subject,
            text:"reset password",
            html: `
      
      <p>this is your  new password, don't give it to anyone</p>
     
     <h1>${password}</h1>
      <p>Thank you for joining!</p>
    `,
        });


    }


    }