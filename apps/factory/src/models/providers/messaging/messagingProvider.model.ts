import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { normalizeNumber } from '@app/common/helpers/normalizeNumber.helper';
import { IMessagingProviderParams, IMessagingProviderTypesParsed } from '../../../interfaces/providers/messagingProvider.interface';
import { EMessagingProviders } from '../../../enums/messagingProviders.enum';

export abstract class MessagingProvider {
    abstract sendMessage(params: IMessagingProviderParams): Promise<any>

    protected _parseParams<K extends keyof IMessagingProviderTypesParsed>(params: IMessagingProviderParams): IMessagingProviderTypesParsed[K] {
        switch(params.target) {
            case EMessagingProviders.SMS:
                const parsedPhone = normalizeNumber(params.to);
                if(!parsedPhone) throw new BadRequestException("Target phone number is required");
                if(!parsedPhone.msisdn) throw new BadRequestException(`"${params.to}" is not a valid phone number`);

                return {
                    message: params.message,
                    to: parsedPhone
                }
            default:
                throw new InternalServerErrorException(`Target ${params.target} invalid for MessagingProvider`);
        }
    }
}