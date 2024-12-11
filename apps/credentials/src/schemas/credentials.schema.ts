import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractDocument } from "@app/common/modules/database/schemas/abstract.schema";
import { ECollectionNames } from "@app/common/enums/collectionNames.enum";
import { ECredentialsTypes } from "../enums/credentials.enum";
import { EStatus } from "@app/common/enums/status.enum";

@Schema({collection: ECollectionNames.credentials, versionKey: false})
export class CredentialsAbstractDocument extends AbstractDocument {
    @Prop({ type: String, enum: ECredentialsTypes, required: true})
    type: ECredentialsTypes;

    @Prop({ type: String, enum: EStatus, required: true})
    status: EStatus;
}

export const CredentialsSchema = SchemaFactory.createForClass(CredentialsAbstractDocument);