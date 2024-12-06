import { registerAs } from "@nestjs/config";
import { IsInt, IsString, Max, Min, ValidateIf } from "class-validator";

import { IDatabaseConfig } from "../interfaces/databaseConfig.interface";
import { validateConfig } from "../helper/validateConfig.helper";

class EnvironmentVariablesValidator {
    @ValidateIf((envValues) => !envValues.DATABASE_URL)
    @IsString()
    DATABASE_URI: string;
}

export default registerAs<IDatabaseConfig>("database", () => {
    validateConfig(process.env, EnvironmentVariablesValidator);
    return {
        uri: process.env.DATABASE_URI
    } as IDatabaseConfig
});