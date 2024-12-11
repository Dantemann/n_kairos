import { Injectable } from "@nestjs/common";
import { EStatus } from "@app/common/enums/status.enum";
import { CredentialsAbstractDocument } from "../../../schemas/credentials.schema";
import { CreateCredentialsDto } from "../../../dtos/credentials.dto";
import { CreateMessagingCredentialDto } from "../dtos/messaging.dto";
import { CredentialAbstractService } from '../../../interfaces/credentialsService.interface';
import { VonageSmsCredentialRepository } from '../repositories/vonageSmsCredential.repository';
import { CreateVonageSmsCredentials } from "../dtos/sms/vonageSms.dto";

@Injectable()
export class VonageSmsCredentialService implements CredentialAbstractService {
    constructor(
        private readonly __vonageSmsRepository: VonageSmsCredentialRepository
    ) {}

    async createCredentials(body: CreateCredentialsDto): Promise<CredentialsAbstractDocument> {
        const credentialData = body.credential as CreateMessagingCredentialDto;
        const dto = await CreateVonageSmsCredentials.allocNew(credentialData.params);

        return await this.__vonageSmsRepository.create({
            secret: dto.secret,
            apiKey: dto.apiKey,
            status: EStatus.ACTIVE
        }) as unknown as CredentialsAbstractDocument;
    }
}