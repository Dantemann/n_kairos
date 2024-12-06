import { Module } from "@nestjs/common"
import { ConfigModule as NestConfigModule } from "@nestjs/config";

import appConfig from "./configs/app.config";
import databaseConfig from "./configs/database.config";

@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true, envFilePath: [".env"],
            load: [
                appConfig,
                databaseConfig
            ]
        })
    ],
    exports: [
        NestConfigModule
    ]
})
export class ConfigModule {}