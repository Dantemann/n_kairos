import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ECredentials } from "../../../enums/credentials.enum";
import { CredentialsAbstractDocument } from "../../credentials.schema";
import { CCollectionName } from "apps/credentials/src/constants/collection.constant";


@Schema({ collection: `${CCollectionName}`, versionKey: false, discriminatorKey: ECredentials.Twilio_SMS})
export class TwilioSmsCredentialsDocument extends CredentialsAbstractDocument {
    @Prop({ type: String, required: true})
    SID: string;
    @Prop({ type: String, required: true})
    AuthToken: string;
    @Prop({ type: String, required: true})
    PhoneNumber: string;
}

export const TwilioSmsCredentialsSchema = SchemaFactory.createForClass(TwilioSmsCredentialsDocument);