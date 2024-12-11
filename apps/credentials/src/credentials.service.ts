import { BadRequestException, Injectable } from "@nestjs/common";
import { AbstractDocument } from "@app/common/modules/database/schemas/abstract.schema";
import { CreateCredentialsDto } from "./dtos/credentials.dto";
import { ECredentialsTypes } from "./enums/credentials.enum";
import { ICredentialsServices } from "./interfaces/credentialsService.interface";
import { CredentialsAbstractDocument } from "./schemas/credentials.schema";
import { CredentialsRepository } from "./credentials.repository";
import { MessagingCredentialsService } from "./modules/messaging/services/messagingCredentials.service";

@Injectable()
export class CredentialsService {
    constructor(
        private readonly __credentialsRepository: CredentialsRepository,
        private readonly __messagingCredentialsService: MessagingCredentialsService
    ) {}

    async createCredential(body: CreateCredentialsDto): Promise<CredentialsAbstractDocument> {
        const service = this.__credentialServices?.[body.type];

        if(!service) throw new BadRequestException(`El tipo de credencial "${body.type}" no es valido`)
        return await service.createCredentials(body);
    }

    async getAll(): Promise<AbstractDocument[]> {
        return await this.__credentialsRepository.find();
    }


    private __credentialServices: ICredentialsServices = {
        [ECredentialsTypes.Messaging]: this.__messagingCredentialsService
    }
}