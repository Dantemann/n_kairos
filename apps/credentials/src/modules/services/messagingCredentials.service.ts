import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateMessagingCredentialDto } from "../messaging/dtos/messaging.dto";
import { EMessagingChannels, EMessagingTargets } from "../messaging/enums/messaging.enum";
import { CreateCredentialsDto } from "../../dtos/credentials.dto";
import { CredentialsAbstractDocument } from "../../schemas/credentials.schema";
import { CredentialAbstractService, ICredentialsServices } from "../../interfaces/credentialsService.interface";
import { TwilioSmsCredentialService } from "../messaging/services/twilioSmsCredential.service";

@Injectable()
export class MessagingCredentialsService implements CredentialAbstractService<CredentialsAbstractDocument> {
    constructor(
        private readonly __twilioSmsCredentialService: TwilioSmsCredentialService
    ) {}
    
    async createCredentials(body: CreateCredentialsDto): Promise<CredentialsAbstractDocument> {
        const validMessagingDto = await CreateMessagingCredentialDto.allocNew(body.credential)
        let service: CredentialAbstractService;
        switch (validMessagingDto.target) {
            case EMessagingTargets.SMS:
                service = this.__smsChannelServices[(body.credential as CreateMessagingCredentialDto)?.channel] ?? null;
                break;
            default:
                throw new BadRequestException(`El target "${validMessagingDto.target}" no es valido`);
        }

        return await service.createCredentials(body);
    }

    private __smsChannelServices: ICredentialsServices = {
        //@ts-nocheck
        [EMessagingChannels.Twilio]: this.__twilioSmsCredentialService
    }
}