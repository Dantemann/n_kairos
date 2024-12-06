import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { MessagingProvider } from "./models/providers/messaging/messagingProvider.model";
import { EMessagingProviders, EMessagingSmsProviderChannels } from "./enums/messagingProviders.enum";
import { IMessagingProviderTypeChannels, IMessagingSmsProviderCredentialTypes } from "./interfaces/providers/messagingProvider.interface";
import { CredentialsAbstractDocument } from "apps/credentials/src/schemas/credentials.schema";
import { TwilioSmsCredentialRepository } from "apps/credentials/src/repositories/notifications/sms/twilioSmsCredentialRepository.repository";
import { TwlioSmsProvider } from "./models/providers/messaging/twilioSmsProvider.model";

@Injectable()
export class MessagingFactorySercice {
    constructor(
        private readonly __twilioSmsRepository: TwilioSmsCredentialRepository
    ) {}

    // async getDefaultProvider(type: EMessagingProviders): MessagingProvider {

    //     return new 
    // }

    async getProvider<K extends keyof IMessagingProviderTypeChannels>(type: K, channel: IMessagingProviderTypeChannels[K]): Promise<MessagingProvider> {
        const credentials = await this.__getCredentials(type, channel);

        switch(type) {
            case EMessagingProviders.SMS:
                switch(channel) {
                    case EMessagingSmsProviderChannels.Twilio:
                        return new TwlioSmsProvider(credentials);
                    default:
                        throw new InternalServerErrorException(`The channel "${channel}" is not valid for SMS Provider`);
                }
            default:
                throw new InternalServerErrorException(`The type "${type}" is not valid for MessagingProvider`);
        }
    }

    private async __getCredentials<K extends keyof IMessagingProviderTypeChannels>(type: K, channel: IMessagingProviderTypeChannels[K]) {
        switch(type) {
            case EMessagingProviders.SMS:
                return await this.__getSmsCredentials(channel);
            default:
                throw new InternalServerErrorException(`The credential type "${type}" is not valid for MessagingProvider`);
        }
    }

    private async __getSmsCredentials<K extends keyof IMessagingSmsProviderCredentialTypes>(channel: K): Promise<IMessagingSmsProviderCredentialTypes[K]> {
        let credentials: IMessagingSmsProviderCredentialTypes[K];
        switch(channel) {
            case EMessagingSmsProviderChannels.Twilio:
                credentials = await this.__twilioSmsRepository.findOne();
                break;
            default:
                throw new InternalServerErrorException(`The channel "${channel}" is not valid for SMS Provider`);
        }

        return credentials;
    }
}