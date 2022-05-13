import { container } from 'tsyringe';
import { LocalStorageProvider } from '../StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from '../StorageProvider/implementations/S3StorageProvider';
import { IMailProvider } from './IMailProvider';
import { EtherealMailProvider } from './implementations/EtherealMailProvider';
import { SESMailProvider } from './implementations/SESMailProvider';

const mailProvider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailProvider[process.env.MAIL_PROVIDER],
);
