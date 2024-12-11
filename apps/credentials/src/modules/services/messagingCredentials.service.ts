import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateMessagingCredentialDto } from "../messaging/dtos/messaging.dto";
import { EMessagingTargets } from "../messaging/enums/messaging.enum";
import { CreateCredentialsDto } from "../../dtos/credentials.dto";
import { CredentialsAbstractDocument } from "../../schemas/credentials.schema";
import { CredentialAbstractService } from "../../interfaces/credentialsService.interface";
import { MessagingSmsCredentialsService } from "../messaging/services/messagingSmsCredentials.service";

@Injectable()
export class MessagingCredentialsService implements CredentialAbstractService<CredentialsAbstractDocument> {
    constructor(
        private readonly __messagingSmsCredentialsService: MessagingSmsCredentialsService
    ) {}
    
    async createCredentials(body: CreateCredentialsDto): Promise<CredentialsAbstractDocument> {
        const validMessagingDto = await CreateMessagingCredentialDto.allocNew(body.credential)
        let service: CredentialAbstractService;
        switch (validMessagingDto.target) {
            case EMessagingTargets.SMS:
                service = this.__messagingSmsCredentialsService;
                break;
            default:
                throw new BadRequestException(`El target "${validMessagingDto.target}" no es valido`);
        }

        return await service.createCredentials(body);
    }
}