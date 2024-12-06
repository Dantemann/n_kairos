import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { CredentialsAbstractDocument } from "../credentials.schema";
import { ENotificationSmsProviders, ECredentialType } from "../../enums/notifications.enum";

@Schema({ collection: `credentials_${ENotificationSmsProviders.Twilio}`, versionKey: false, discriminatorKey: ENotificationSmsProviders.Twilio})
export class TwilioSmsCredentialsDocument extends CredentialsAbstractDocument {
    @Prop({ type: String, required: true})
    SID: string;
    @Prop({ type: String, required: true})
    AuthToken: string;
    @Prop({ type: String, required: true})
    PhoneNumber: string;
}

export const TwilioSmsCredentialsSchema = SchemaFactory.createForClass(TwilioSmsCredentialsDocument);