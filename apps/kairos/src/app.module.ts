import { Module, OnModuleInit } from '@nestjs/common';
import { CredentialsModule } from 'apps/credentials/src/credentials.module';
import { FactoryModule } from 'apps/factory/src/factory.module';
import { FactoryService } from 'apps/factory/src/factory.service';

@Module({
  imports: [
    CredentialsModule,
    FactoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly __factorySvc: FactoryService
  ) {}

  async onModuleInit() {
    // const provider = await this.__factorySvc.getFactory('SMS')
    // await provider.sendMessage({
    //   message: "Test",
    //   to: "0981241848"
    // });
  }
}
