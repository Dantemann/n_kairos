import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { TwilioSmsCredentialRepository } from "./twilioSmsCredentialRepository.repository";
import { ENotificationSmsProviders } from "../../enums/notifications.enum";

@Injectable()
export class SmsCredentialsRepository {
    constructor(
        private readonly __twilioRepository: TwilioSmsCredentialRepository
    ) {}

    async getDefaultCredentials() {
        const repository = this.__getProviderRepository(ENotificationSmsProviders.Twilio);

        const credentials = await repository.findOne();

        return credentials;
    }

    async getCredentials(provider: ENotificationSmsProviders) {
        const repository = this.__getProviderRepository(provider);

        const credentials = await repository.findOne();

        return credentials;
    }

    private __getProviderRepository(provider: ENotificationSmsProviders) {
        switch(provider) {
            case ENotificationSmsProviders.Twilio:
                return this.__twilioRepository;
            default: 
                throw new InternalServerErrorException(`SMS provider ${provider} is not valid`);
        }
    }
}