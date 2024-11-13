import { inject } from '@loopback/core';
import nodemailer from 'nodemailer';


interface MailConfig {
  host: string;
  port: number;
  auth: {
    user: string;
    pass: string;
  };
}

export class EmailService {
  constructor(
    @inject('mail.config') private mailConfig: MailConfig,
  ) {}

  sendResetPasswordEmail(email: string, token: string, host: string) {
    const transporter = nodemailer.createTransport(this.mailConfig);

    const mailOptions = {
      to: email,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
        `http://${host}/reset/${token}\n\n` +
        `If you did not request this, please ignore this email.\n`,
    };

    return transporter.sendMail(mailOptions);
  }
}


export const getMailConfig = (): MailConfig => {
  return {
    host: process.env.MAIL_HOST ?? '',
    port: Number(process.env.MAIL_PORT) || 587,
    auth: {
      user: process.env.MAIL_USER ?? '',
      pass: process.env.MAIL_PASS ?? '',
    },
  };
};