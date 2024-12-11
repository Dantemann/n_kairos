import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ECollectionNames } from "@app/common/enums/collectionNames.enum";
import { MessagingAbstractCredentials } from "../messaging.schema";

@Schema({ collection: ECollectionNames.credentials, versionKey: false, toJSON: {
    getters: true
} })
export class VonageSmsCredentialDocument extends MessagingAbstractCredentials {
    @Prop({ type: String, required: true, get: (sid: string) => sid })
    apiKey: string;

    @Prop({ type: String, required: true})
    secret: string;
}

export const VonageSmsCredentialsSchema = SchemaFactory.createForClass(VonageSmsCredentialDocument)