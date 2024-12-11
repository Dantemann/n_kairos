import { IsEnum, IsNotEmpty } from "class-validator";
import { ECredentialsTypes } from "../enums/credentials.enum";

export class CreateCredentialsDto {
    @IsEnum(ECredentialsTypes)
    type: ECredentialsTypes;

    @IsNotEmpty()
    credential: object;
}