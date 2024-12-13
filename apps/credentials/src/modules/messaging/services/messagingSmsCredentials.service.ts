import { BadRequestException, Injectable } from "@nestjs/common";
import { CredentialAbstractService, ICredentialsServices } from "../../../interfaces/credentialsService.interface";
import { CredentialsAbstractDocument } from "../../../schemas/credentials.schema";
import { CreateCredentialsDto } from "../../../dtos/credentials.dto";
import { EMessagingChannels } from "../enums/messaging.enum";
import { CreateMessagingCredentialDto } from "../dtos/messaging.dto";
import { TwilioSmsCredentialService } from "./twilioSmsCredential.service";
import { VonageSmsCredentialService } from "./vonageSmsCredential.service";

@Injectable()
export class MessagingSmsCredentialsService implements CredentialAbstractService {
    constructor(
        private readonly __twilioSmsCredentialsService: TwilioSmsCredentialService,
        private readonly __vonageSmsCredentialService: VonageSmsCredentialService
    ) {}

    async createCredentials(body: CreateCredentialsDto): Promise<CredentialsAbstractDocument> {
        const validMessagingDto = await CreateMessagingCredentialDto.allocNew(body.credential);
        let service: CredentialAbstractService<CreateMessagingCredentialDto> = this.__smsChannelServices?.[validMessagingDto.channel]??null;

        if(!service) throw new BadRequestException(`El canal "${validMessagingDto.channel}" no es valido para ${validMessagingDto.target}`);

        return await service.createCredentials(validMessagingDto);
    }

    private __smsChannelServices: ICredentialsServices<CreateMessagingCredentialDto> = {
        [EMessagingChannels.Twilio]: this.__twilioSmsCredentialsService,
        [EMessagingChannels.Vonage]: this.__vonageSmsCredentialService
    }
}