import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { AbstractDocument } from "@app/common/modules/database/schemas/abstract.schema";

@Schema({collection: "credentials", versionKey: false})
export class CredentialsAbstractDocument extends AbstractDocument {
    @Prop({ type: String, required: true})
    provider: string;

    @Prop({ type: String, required: true})
    status: string;
}

export const CredentialsSchema = SchemaFactory.createForClass(CredentialsAbstractDocument);