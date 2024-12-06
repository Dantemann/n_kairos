import { Prop, Schema } from "@nestjs/mongoose";
import { now, SchemaTypes, Types } from "mongoose";

@Schema({timestamps: true})
export class AbstractDocument {
    @Prop({type: SchemaTypes.ObjectId})
    _id: Types.ObjectId

    @Prop({default: now(), type: Date})
    createdAt: Date;

    @Prop({default: now(), type: Date})
    updatedAt: Date;
}