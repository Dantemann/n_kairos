import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ECollectionNames } from '@app/common/enums/collectionNames.enum';
import { DatabaseModule } from '@app/common/modules/database/database.module';
import { CredentialsSchema } from './schemas/credentials.schema';
import { CredentialsController } from './credentials.controller';
import { CredentialsService } from './credentials.service';
import { MessagingCredentialsModule } from './modules/messaging/messagingCredentials.module';
import { CredentialsRepository } from './credentials.repository';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([
      {
        name: ECollectionNames.credentials, schema: CredentialsSchema
      }
    ]),
    MessagingCredentialsModule
  ],
  controllers: [
    CredentialsController
  ],
  providers: [
    CredentialsService,
    CredentialsRepository
  ],
})
export class CredentialsModule {}
