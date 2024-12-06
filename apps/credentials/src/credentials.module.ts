import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from '@app/common/modules/database/database.module';
import { TwilioSmsCredentialRepository } from './repositories/notifications/sms/twilioSmsCredentialRepository.repository';
import { CredentialsSchema } from './schemas/credentials.schema';
import { CCollectionName } from './constants/collection.constant';
import { ECredentials } from './enums/credentials.enum';
import { TwilioSmsCredentialsSchema } from './schemas/notifications/sms/twilioSmsCredentials.schema';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: CCollectionName, schema: CredentialsSchema, discriminators: [
          {
            name: `${CCollectionName}_${ECredentials.Twilio_SMS}`,
            schema: TwilioSmsCredentialsSchema
          }
        ] 
      }
    ])
  ],
  controllers: [],
  providers: [
    TwilioSmsCredentialRepository
  ],
  exports: [
    TwilioSmsCredentialRepository
  ]
})
export class CredentialsModule {}
