import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateMessagingCredentialDto } from "../dtos/messaging.dto";
import { EMessagingChannels, EMessagingTargets } from "../enums/messaging.enum";
import { CreateCredentialsDto } from "../../../dtos/credentials.dto";
import { CredentialsAbstractDocument } from "../../../schemas/credentials.schema";
import { CredentialAbstractService, ICredentialsServices } from "../../../interfaces/credentialsService.interface";
import { TwilioSmsCredentialService } from "./twilioSmsCredential.service";
import { VonageSmsCredentialService } from "./vonageSmsCredential.service";

@Injectable()
export class MessagingCredentialsService implements CredentialAbstractService<CredentialsAbstractDocument> {
    constructor(
        private readonly __twilioSmsCredentialService: TwilioSmsCredentialService,
        private readonly __vonageSmsCredentialService: VonageSmsCredentialService
    ) {}
    
    async createCredentials(body: CreateCredentialsDto): Promise<CredentialsAbstractDocument> {
        const validMessagingDto = await CreateMessagingCredentialDto.allocNew(body.credential)
        let service: CredentialAbstractService;
        switch (validMessagingDto.target) {
            case EMessagingTargets.SMS:
                const credentials = (body.credential as CreateMessagingCredentialDto)
                service = this.__smsChannelServices[credentials?.channel] ?? null;
                if(!service) throw new BadRequestException(`El canal "${credentials.channel}" no es valido para ${credentials.target}`);
                break;
            default:
                throw new BadRequestException(`El target "${validMessagingDto.target}" no es valido`);
        }

        return await service.createCredentials(body);
    }

    private __smsChannelServices: ICredentialsServices = {
        [EMessagingChannels.Twilio]: this.__twilioSmsCredentialService,
        [EMessagingChannels.Vonage]: this.__vonageSmsCredentialService
    }
}