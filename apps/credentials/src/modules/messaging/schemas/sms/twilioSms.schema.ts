import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ECollectionNames } from "@app/common/enums/collectionNames.enum";
import { MessagingAbstractCredentials } from "../messaging.schema";

@Schema({ collection: ECollectionNames.credentials, versionKey: false, toJSON: {
    getters: true
} })
export class TwilioSmsCredentialDocument extends MessagingAbstractCredentials {
    @Prop({ type: String, required: true, get: (sid: string) => sid })
    sid: string;

    @Prop({ type: String, required: true})
    secret: string;

    @Prop({ type: String, required: true})
    phoneNumber: string;
}

export const TwilioSmsCredentialsSchema = SchemaFactory.createForClass(TwilioSmsCredentialDocument)