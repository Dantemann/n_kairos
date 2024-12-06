import { registerAs } from "@nestjs/config";
import { IsInt, IsString, Max, Min } from "class-validator";
import { IAppConfig } from "../interfaces/appConfig.interface";
import { validateConfig } from "../helper/validateConfig.helper";



class EnvironmentVariablesValidator {
    @IsInt()
    @Min(0)
    @Max(65535)
    APP_PORT: number;
  
    @IsString()
    API_PREFIX: string;
}

export default registerAs<IAppConfig>("app", () => {
    validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        apiPrefix: process.env.API_PREFIX,
        port: Number(process.env.APP_PORT),
    } as IAppConfig
});