import { Module } from '@nestjs/common';
import { CredentialsModule } from 'apps/credentials/src/credentials.module';
import { SuperFactoryService } from './superFactory.service';
import { MessagingFactorySercice } from './messagingFactory.service';

@Module({
  imports: [
    CredentialsModule
  ],
  controllers: [],
  providers: [
    SuperFactoryService,
    MessagingFactorySercice
  ],
  exports: [
    SuperFactoryService,
    MessagingFactorySercice
  ]
})
export class FactoryModule {}
