import { Module } from '@nestjs/common';
import { CredentialsModule } from 'apps/credentials/src/credentials.module';

@Module({
  imports: [
    CredentialsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule{}
