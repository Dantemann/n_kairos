import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@app/common/modules/database/repositories/abstract.repository";
import { ECollectionNames } from "@app/common/enums/collectionNames.enum";
import { VonageSmsCredentialDocument } from "../schemas/sms/vonageSms.schema";
import { ECredentialsTypes } from "../../../enums/credentials.enum";
import { EMessagingChannels, EMessagingTargets } from "../enums/messaging.enum";

@Injectable()
export class VonageSmsCredentialRepository extends AbstractRepository<VonageSmsCredentialDocument> {
    protected _logger: Logger = new Logger(VonageSmsCredentialRepository.name);

    constructor(
        @InjectModel(`${ECollectionNames.credentials}_${ECredentialsTypes.Messaging}_${EMessagingChannels.Vonage}_${EMessagingTargets.SMS}`)
        protected readonly model: Model<VonageSmsCredentialDocument>
    ) {
        super(model);
    }

    private __selfParams = {
        channel: EMessagingChannels.Vonage,
        target: EMessagingTargets.SMS,
        type: ECredentialsTypes.Messaging
    }

    async findOne(filterQuery: FilterQuery<VonageSmsCredentialDocument> = null, orFail: boolean = false): Promise<VonageSmsCredentialDocument> {
        return super.findOne(filterQuery ? {
            ...filterQuery,
            ...this.__selfParams
        } : this.__selfParams, orFail);
    }

    async create(document: Omit<VonageSmsCredentialDocument, "_id"|"target" | "type" | "channel" | "createdAt" | "updatedAt">): Promise<VonageSmsCredentialDocument> {
        return super.create({
            ...document,
            ...this.__selfParams
        });
    }
}