import nodemailer from 'nodemailer';
import pug from 'pug';
import path from 'node:path';

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  generateEmail = (fileName, data) => {
    const pathToTemplate = path.resolve('src', 'views', fileName);
    return pug.renderFile(pathToTemplate, { ...data });
  };

  sendResetPasswordEmail = async (to, token) => {
    const html = this.generateEmail('resetPasswordMail.pug', { url: `${process.env.FRONTEND_URL}/new-password`, token });
    await this.transporter.sendMail({
      from: process.env.MAILER_EMAIL,
      to,
      subject: 'Reset your password',
      html,
    });
  };

  sendChangedPasswordNotification = async (to) => {
    const html = this.generateEmail('changedEmailNotification.pug');
    await this.transporter.sendMail({
      from: process.env.MAILER_EMAIL,
      to,
      subject: 'Your password has been changed',
      html,
    });
  };
}

export default new MailService();
