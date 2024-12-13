import { FilterQuery, Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { EStatus } from "@app/common/enums/status.enum";
import { AbstractRepository } from "@app/common/modules/database/repositories/abstract.repository";
import { CredentialsAbstractDocument } from "../../../schemas/credentials.schema";
import { CreateCredentialsDto } from "../../../dtos/credentials.dto";
import { CreateMessagingCredentialDto } from "../dtos/messaging.dto";
import { CreateTwilioSmsCredentials } from "../dtos/sms/twilioSms.dto";
import { CredentialAbstractService } from '../../../interfaces/credentialsService.interface';
import { TwilioSmsCredentialDocument } from "../schemas/sms/twilioSms.schema";
import { ECredentialsNames, ECredentialsTypes } from "../../../enums/credentials.enum";
import { EMessagingChannels, EMessagingTargets } from "../enums/messaging.enum";

@Injectable()
export class TwilioSmsCredentialService extends AbstractRepository<TwilioSmsCredentialDocument> implements CredentialAbstractService<CreateMessagingCredentialDto> {
    protected _logger: Logger = new Logger(TwilioSmsCredentialService.name);

    constructor(
        @InjectModel(ECredentialsNames.MessagingTwilioSms)
        protected readonly model: Model<TwilioSmsCredentialDocument>
    ) {
        super(model);
    }

    private __selfParams = {
        channel: EMessagingChannels.Twilio,
        target: EMessagingTargets.SMS,
        type: ECredentialsTypes.Messaging
    }

    async createCredentials(body: CreateMessagingCredentialDto): Promise<CredentialsAbstractDocument> {
        const dto = await CreateTwilioSmsCredentials.allocNew(body.params);

        return await this.create({
            phoneNumber: dto.phoneNumber,
            secret: dto.secret,
            sid: dto.sid,
            status: EStatus.ACTIVE
        }) as unknown as CredentialsAbstractDocument;
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