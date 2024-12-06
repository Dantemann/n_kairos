import { BadRequestException } from "@nestjs/common"

import { ISmsProviderParams, ISmsProviderParsedParams } from "@app/common/interfaces/providers/smsProvider.interface"
import { normalizeNumber } from "@app/common/helpers/normalizeNumber.helper";

export abstract class SmsProvider {
    abstract sendMessage(params: ISmsProviderParams): Promise<any>

    protected _validateParams(params: ISmsProviderParams): ISmsProviderParsedParams {
        if(!params.message) throw new BadRequestException("El cuerpo del mensaje es requerido");

        const parsedPhoneNumber = normalizeNumber(params.to)
        if(!parsedPhoneNumber) throw new BadRequestException("El numero al que se desea enviar el SMS es requerido");
        if(!parsedPhoneNumber.msisdn) throw new BadRequestException("El numero al que se desea enviar el SMS no es valido");

        return {
            message: params.message,
            to: parsedPhoneNumber
        }
    }    
}
