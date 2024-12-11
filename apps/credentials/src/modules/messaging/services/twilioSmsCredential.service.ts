import { Injectable } from "@nestjs/common";
import { CredentialsAbstractDocument } from "../../../schemas/credentials.schema";
import { CreateCredentialsDto } from "../../../dtos/credentials.dto";
import { CreateMessagingCredentialDto } from "../dtos/messaging.dto";
import { CreateTwilioSmsCredentials } from "../dtos/sms/twilioSms.dto";
import { CredentialAbstractService } from '../../../interfaces/credentialsService.interface';
import { TwilioSmsCredentialRepository } from "../repositories/twilioSmsCredential.repository";
import { EStatus } from "@app/common/enums/status.enum";

@Injectable()
export class TwilioSmsCredentialService implements CredentialAbstractService {
    constructor(
        private readonly __twlioSmsRepository: TwilioSmsCredentialRepository
    ) {}

    async createCredentials(body: CreateCredentialsDto): Promise<CredentialsAbstractDocument> {
        const credentialData = body.credential as CreateMessagingCredentialDto;
        const dto = await CreateTwilioSmsCredentials.allocNew(credentialData.params);

        return await this.__twlioSmsRepository.create({
            phoneNumber: dto.phoneNumber,
            secret: dto.secret,
            sid: dto.sid,
            status: EStatus.ACTIVE
        }) as unknown as CredentialsAbstractDocument;
    }
}