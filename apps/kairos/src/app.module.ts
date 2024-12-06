import { Module, OnModuleInit } from '@nestjs/common';
import { CredentialsModule } from 'apps/credentials/src/credentials.module';
import { EFactoryType } from 'apps/factory/src/enums/factoryTypes.enum';
import { EMessagingProviders, EMessagingSmsProviderChannels } from 'apps/factory/src/enums/messagingProviders.enum';
import { FactoryModule } from 'apps/factory/src/factory.module';
import { SuperFactoryService } from 'apps/factory/src/superFactory.service';

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
    private readonly __superFactory: SuperFactoryService
  ) {}

  async onModuleInit() {
    const factory = await this.__superFactory.getFactory(EFactoryType.Messaging);
    const provider = await factory.getProvider(EMessagingProviders.SMS, EMessagingSmsProviderChannels.Twilio);

    await provider.sendMessage({
      message: "Test",
      target: EMessagingProviders.SMS,
      to: "0981241848"
    })
  }
}
