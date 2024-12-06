import { FilterQuery, Model } from "mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AbstractRepository } from "@app/common/modules/database/repositories/abstract.repository";
import { EStatus } from "@app/common/enums/status.enum";
import { ECredentials } from "../../../enums/credentials.enum";
import { TwilioSmsCredentialsDocument } from "../../../schemas/notifications/sms/twilioSmsCredentials.schema";
import { CCollectionName } from "../../../constants/collection.constant";

@Injectable()
export class TwilioSmsCredentialRepository extends AbstractRepository<TwilioSmsCredentialsDocument> {
    protected _logger: Logger = new Logger(TwilioSmsCredentialRepository.name);

    constructor(
        @InjectModel(`${CCollectionName}_${ECredentials.Twilio_SMS}`)
        protected readonly model: Model<TwilioSmsCredentialsDocument>
    ) {
        super(model)
    }

    async findOne(filterQuery: FilterQuery<TwilioSmsCredentialsDocument> = null, orFail: boolean = false): Promise<TwilioSmsCredentialsDocument> {
        return super.findOne(filterQuery ? {
            ...filterQuery,
            provider: ECredentials.Twilio_SMS
        } : {
            status: EStatus.ACTIVE,
            provider: ECredentials.Twilio_SMS
        }, orFail);
    }

    async create(document: Omit<TwilioSmsCredentialsDocument, "_id" | "provider" | "createdAt" | "updatedAt">): Promise<TwilioSmsCredentialsDocument> {
        return super.create({
            ...document,
            provider: ECredentials.Twilio_SMS
        });
    }
}