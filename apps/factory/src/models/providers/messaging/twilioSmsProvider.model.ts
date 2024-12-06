import * as Twilio from "twilio";
import { IMessagingProviderParams } from "apps/factory/src/interfaces/providers/messagingProvider.interface";
import { MessagingProvider } from "./messagingProvider.model";
import { TwilioSmsCredentialsDocument } from "apps/credentials/src/schemas/notifications/sms/twilioSmsCredentials.schema";

export class TwlioSmsProvider extends MessagingProvider {
    private __client: Twilio.Twilio;
    private __fromPhoneNumber: string;
    constructor(credentials: TwilioSmsCredentialsDocument) {
        super();
        this.__client = Twilio(credentials.SID, credentials.AuthToken);
        this.__fromPhoneNumber = credentials.PhoneNumber;
    }

    async sendMessage(params: IMessagingProviderParams): Promise<any> {
        const parsedParams = this._parseParams(params);
        console.log("Mensaje enviado Twilio sms");
        return null;
    }
}