import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { SmsProvider } from "@app/common/models/providers/smsProvider.model";

import { SmsCredentialsRepository } from "apps/credentials/src/repositories/sms/smsCredential.repository";
import { ENotificationSmsProviders } from "apps/credentials/src/enums/notifications.enum";

import { IFactoryTypes } from "./interfaces/factoryTypes.interface";
import { TwilioSmsProvider } from "./providers/sms/twilioSmsProvider.model";

@Injectable()
export class FactoryService {
    constructor(
        private readonly __smsCredentialRepository: SmsCredentialsRepository
    ) {}
    async getFactory<K extends keyof IFactoryTypes>(factory: K): Promise<IFactoryTypes[K]> {
        switch(factory) {
            case "SMS":
                return this.__getSmsProvider();
            default:
                throw new InternalServerErrorException(`El factory ${factory} no es valido`);
        }
    }

    private async __getSmsProvider(provider: ENotificationSmsProviders = ENotificationSmsProviders.Twilio): Promise<SmsProvider> {
        const credentials = await this.__smsCredentialRepository.getCredentials(provider);

        switch(provider) {
            case ENotificationSmsProviders.Twilio:
                return TwilioSmsProvider.allocNew(credentials);
            default:
                throw new InternalServerErrorException(`El provider ${provider} no es valido para SMS`);
        }
    }
}