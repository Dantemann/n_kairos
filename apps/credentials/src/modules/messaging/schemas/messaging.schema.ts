import { Prop, Schema } from "@nestjs/mongoose";
import { ECollectionNames } from "@app/common/enums/collectionNames.enum";
import { CredentialsAbstractDocument } from "../../../schemas/credentials.schema";
import { EMessagingChannels, EMessagingTargets } from "../enums/messaging.enum";

@Schema({ collection: ECollectionNames.credentials, versionKey: false })
export abstract class MessagingAbstractCredentials extends CredentialsAbstractDocument {
    @Prop({type: String, enum: EMessagingTargets, required: true })
    target: EMessagingTargets

    @Prop({type: String, enum: EMessagingChannels, required: true})
    channel: EMessagingChannels
}