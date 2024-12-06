import { Module } from '@nestjs/common';
import { CredentialsModule } from 'apps/credentials/src/credentials.module';
import { FactoryService } from './factory.service';

@Module({
  imports: [
    CredentialsModule
  ],
  controllers: [],
  providers: [
    FactoryService
  ],
  exports: [
    FactoryService
  ]
})
export class FactoryModule {}
