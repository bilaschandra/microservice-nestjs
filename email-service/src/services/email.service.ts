import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  async send(mailOptions, callback): Promise<any> {
    const EMAIL_ID = process.env.EMAIL_ID;
    const EMAIL_PWD = process.env.EMAIL_PWD;
    const EMAIL_SERVICE = process.env.EMAIL_SERVICE;

    const transporter = nodemailer.createTransport({
      service: EMAIL_SERVICE,
      auth: {
        user: EMAIL_ID,
        pass: EMAIL_PWD,
      },
    });

    return transporter.sendMail(mailOptions, callback);
  }
}
