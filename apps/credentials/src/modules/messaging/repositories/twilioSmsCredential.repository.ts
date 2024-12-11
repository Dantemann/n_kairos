import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@app/common/modules/database/repositories/abstract.repository";
import { ECollectionNames } from "@app/common/enums/collectionNames.enum";
import { TwilioSmsCredentialDocument } from "../schemas/sms/twilioSms.schema";
import { ECredentialsTypes } from "../../../enums/credentials.enum";
import { EMessagingChannels, EMessagingTargets } from "../enums/messaging.enum";

@Injectable()
export class TwilioSmsCredentialRepository extends AbstractRepository<TwilioSmsCredentialDocument> {
    protected _logger: Logger = new Logger(TwilioSmsCredentialRepository.name);

    constructor(
        @InjectModel(`${ECollectionNames.credentials}_${ECredentialsTypes.Messaging}_${EMessagingChannels.Twilio}_${EMessagingTargets.SMS}`)
        protected readonly model: Model<TwilioSmsCredentialDocument>
    ) {
        super(model);
    }

    private __selfParams = {
        channel: EMessagingChannels.Twilio,
        target: EMessagingTargets.SMS,
        type: ECredentialsTypes.Messaging
    }

    async findOne(filterQuery: FilterQuery<TwilioSmsCredentialDocument> = null, orFail: boolean = false): Promise<TwilioSmsCredentialDocument> {
        return super.findOne(filterQuery ? {
            ...filterQuery,
            ...this.__selfParams
        } : this.__selfParams, orFail);
    }

    async create(document: Omit<TwilioSmsCredentialDocument, "_id"|"target" | "type" | "channel" | "createdAt" | "updatedAt">): Promise<TwilioSmsCredentialDocument> {
        return super.create({
            ...document,
            ...this.__selfParams
        });
    }
}