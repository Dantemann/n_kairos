import { FilterQuery, Model } from "mongoose";

import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

import { AbstractRepository } from "@app/common/modules/database/repositories/abstract.repository";
import { EStatus } from "@app/common/enums/status.enum";

import { TwilioSmsCredentialsDocument } from "../../schemas/sms/twilioSmsCredentials.schema";
import { ENotificationSmsProviders } from "../../enums/notifications.enum";

@Injectable()
export class TwilioSmsCredentialRepository extends AbstractRepository<TwilioSmsCredentialsDocument> {
    protected _logger: Logger = new Logger(TwilioSmsCredentialRepository.name);

    constructor(
        @InjectModel(`credentials_${ENotificationSmsProviders.Twilio}`)
        protected readonly model: Model<TwilioSmsCredentialsDocument>
    ) {
        super(model)
    }

    async findOne(filterQuery: FilterQuery<TwilioSmsCredentialsDocument> = null, orFail: boolean = false): Promise<TwilioSmsCredentialsDocument> {
        return super.findOne(filterQuery ? {
            ...filterQuery,
            provider: ENotificationSmsProviders.Twilio
        } : {
            status: EStatus.ACTIVE,
            provider: ENotificationSmsProviders.Twilio
        }, orFail);
    }

    async create(document: Omit<TwilioSmsCredentialsDocument, "_id" | "provider" | "createdAt" | "updatedAt">): Promise<TwilioSmsCredentialsDocument> {
        return super.create({
            ...document,
            provider: ENotificationSmsProviders.Twilio
        });
    }
}