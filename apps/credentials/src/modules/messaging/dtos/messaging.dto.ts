import { IsEnum, IsNotEmpty } from "class-validator";
import { EMessagingChannels, EMessagingTargets } from "../enums/messaging.enum";
import { AbstractValidateDto } from "@app/common/utils/abstractValidateDto";

export class CreateMessagingCredentialDto extends AbstractValidateDto {
    protected _properties: string[] = ["target", "channel", "params"];

    @IsNotEmpty()
    @IsEnum(EMessagingTargets)
    target: EMessagingTargets

    @IsNotEmpty()
    @IsEnum(EMessagingChannels)
    channel: EMessagingChannels;

    @IsNotEmpty()
    params: object;

    protected async _allocNew<T = CreateMessagingCredentialDto>(body: object): Promise<T> {
        return await super._allocNew<T>(body, new CreateMessagingCredentialDto());
    }

    static async allocNew(body: object): Promise<CreateMessagingCredentialDto> {
        return await (new CreateMessagingCredentialDto)._allocNew(body);
    }
}