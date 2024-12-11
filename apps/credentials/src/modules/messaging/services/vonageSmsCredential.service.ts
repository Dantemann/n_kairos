import { FilterQuery, Model } from "mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EStatus } from "@app/common/enums/status.enum";
import { AbstractRepository } from "@app/common/modules/database/repositories/abstract.repository";
import { CredentialsAbstractDocument } from "../../../schemas/credentials.schema";
import { CreateCredentialsDto } from "../../../dtos/credentials.dto";
import { CreateMessagingCredentialDto } from "../dtos/messaging.dto";
import { CredentialAbstractService } from '../../../interfaces/credentialsService.interface';
import { CreateVonageSmsCredentials } from "../dtos/sms/vonageSms.dto";
import { VonageSmsCredentialDocument } from "../schemas/sms/vonageSms.schema";
import { EMessagingChannels, EMessagingTargets } from "../enums/messaging.enum";
import { ECredentialsNames, ECredentialsTypes } from "../../../enums/credentials.enum";

@Injectable()
export class VonageSmsCredentialService extends AbstractRepository<VonageSmsCredentialDocument> implements CredentialAbstractService {
    protected _logger: Logger = new Logger(VonageSmsCredentialService.name);

    constructor(
        @InjectModel(ECredentialsNames.MessagingVonageSms)
        protected readonly model: Model<VonageSmsCredentialDocument>
    ) {
        super(model);
    }

    private __selfParams = {
        channel: EMessagingChannels.Vonage,
        target: EMessagingTargets.SMS,
        type: ECredentialsTypes.Messaging
    }

    async createCredentials(body: CreateCredentialsDto): Promise<CredentialsAbstractDocument> {
        const credentialData = body.credential as CreateMessagingCredentialDto;
        const dto = await CreateVonageSmsCredentials.allocNew(credentialData.params);

        return await this.create({
            secret: dto.secret,
            apiKey: dto.apiKey,
            status: EStatus.ACTIVE
        }) as unknown as CredentialsAbstractDocument;
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