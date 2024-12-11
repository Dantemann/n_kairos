import { AbstractValidateDto } from "@app/common/utils/abstractValidateDto";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTwilioSmsCredentials extends AbstractValidateDto {
    protected _properties: string[] = ["sid", "secret", "phoneNumber"];

    @IsNotEmpty()
    @IsString()
    sid: string;

    @IsNotEmpty()
    @IsString()
    secret: string;

    @IsNotEmpty()
    @IsString()
    phoneNumber: string;

    protected async _allocNew<T = CreateTwilioSmsCredentials>(body: object): Promise<T> {
        return await super._allocNew<T>(body, new CreateTwilioSmsCredentials());
    }

    static async allocNew(body: object): Promise<CreateTwilioSmsCredentials> {
        return await (new CreateTwilioSmsCredentials)._allocNew(body);
    }
}