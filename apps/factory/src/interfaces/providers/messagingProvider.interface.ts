import { INormalizeNumber } from "@app/common/interfaces/normalizeNumber";
import { EMessagingSmsProviderChannels, EMessagingProviders } from "../../enums/messagingProviders.enum";
import { TwilioSmsCredentialsDocument } from "apps/credentials/src/schemas/notifications/sms/twilioSmsCredentials.schema";

export interface IMessagingProviderParams {
    target: EMessagingProviders
    to: string;
    message: string;    
}

export interface IMessagingProviderTypesParsed {
    [EMessagingProviders.SMS]: IMessagingProviderSmsParams
}

export interface IMessagingProviderSmsParams {
    to: INormalizeNumber;
    message: string;
}

export interface IMessagingProviderTypeChannels {
    [EMessagingProviders.SMS]: EMessagingSmsProviderChannels
}

export interface IMessagingSmsProviderCredentialTypes {
    [EMessagingSmsProviderChannels.Twilio]: TwilioSmsCredentialsDocument
}