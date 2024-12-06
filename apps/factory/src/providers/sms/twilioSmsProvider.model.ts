import { ISmsProviderParams } from "@app/common/interfaces/providers/smsProvider.interface";
import { SmsProvider } from "@app/common/models/providers/smsProvider.model";
import { TwilioSmsCredentialsDocument } from "apps/credentials/src/schemas/sms/twilioSmsCredentials.schema";
import * as Twilio from "twilio";

export class TwilioSmsProvider extends SmsProvider {
    private __client: Twilio.Twilio;
    private readonly __fromPhoneNumber: string; 

    private constructor(sid: string, token: string, fromPhone: string) {
        super();
        this.__client = Twilio(sid, token);
        this.__fromPhoneNumber = fromPhone;
    }

    static async allocNew(credentials: TwilioSmsCredentialsDocument) {
        return new TwilioSmsProvider(credentials.SID, credentials.AuthToken, credentials.PhoneNumber);
    }

    async sendMessage(params: ISmsProviderParams): Promise<any> {
        const parsedParams = this._validateParams(params);
        await this.__client.messages.create({
            to: parsedParams.to.msisdn,
            body: parsedParams.message,
            from: this.__fromPhoneNumber
        });
    }
}