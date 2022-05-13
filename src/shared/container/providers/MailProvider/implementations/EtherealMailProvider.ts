import { injectable } from 'tsyringe';
import nodemailer, { Transporter } from 'nodemailer';
import { IMailProvider } from '../IMailProvider';
import handlebars from 'handlebars';
import fs from 'fs';

@injectable()
class EtherealMailProvider implements IMailProvider {
  constructor() {
    this.createClient();
  }

  private async createClient() {
    try {
      const account = await nodemailer.createTestAccount();

      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

  private client: Transporter;

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    if (!this.client) {
      await this.createClient();
    }

    const templateFileContent = fs.readFileSync(path).toString('utf-8');
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: 'Rentx <noreply@rentex.com.br>',
      subject,
      html: templateHTML,
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
