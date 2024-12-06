import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule } from '@app/common/modules/database/database.module';

import { ENotificationSmsProviders, ECredentialType } from './enums/notifications.enum';
import { SmsCredentialsRepository } from './repositories/sms/smsCredential.repository';
import { TwilioSmsCredentialRepository } from './repositories/sms/twilioSmsCredentialRepository.repository';
import { CredentialsSchema } from './schemas/credentials.schema';
import { TwilioSmsCredentialsSchema } from './schemas/sms/twilioSmsCredentials.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: "credentials", schema: CredentialsSchema, discriminators: [
          {
            name: `credentials_${ENotificationSmsProviders.Twilio}`,
            schema: TwilioSmsCredentialsSchema
          }
        ] 
      }
    ])
  ],
  controllers: [],
  providers: [
    SmsCredentialsRepository,
    TwilioSmsCredentialRepository
  ],
  exports: [
    SmsCredentialsRepository,
    TwilioSmsCredentialRepository
  ]
})
export class CredentialsModule {}
