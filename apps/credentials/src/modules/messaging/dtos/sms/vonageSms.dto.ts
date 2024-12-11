import { AbstractValidateDto } from "@app/common/utils/abstractValidateDto";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateVonageSmsCredentials extends AbstractValidateDto {
    protected _properties: string[] = ["apiKey", "secret"];

    @IsNotEmpty()
    @IsString()
    apiKey: string;

    @IsNotEmpty()
    @IsString()
    secret: string;

    protected async _allocNew<T = CreateVonageSmsCredentials>(body: object): Promise<T> {
        return await super._allocNew<T>(body, new CreateVonageSmsCredentials());
    }

    static async allocNew(body: object): Promise<CreateVonageSmsCredentials> {
        return await (new CreateVonageSmsCredentials)._allocNew(body);
    }
}