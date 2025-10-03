import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from '../dto/notify-email.dto';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get('MAIL_ID'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
    });
  }

  // auth: {
  //   type: 'OAUTH2',
  //   user: this.configService.get('SMTP_USER'),
  //   clientId:this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
  //   clientSecret:this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
  //   refreshToken:this.configService.get('REFRESH_TOKEN')
  // },

  async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.transporter.sendMail({
      from: this.configService.get('MAIL_ID'),
      to: email,
      subject: 'Sleepr Notification',
      text: text,
    });
  }
}
