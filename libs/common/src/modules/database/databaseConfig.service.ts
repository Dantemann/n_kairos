import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import { IAllConfig } from "../config/interfaces/allConfig.interface";

@Injectable()
export class DatabaseConfigService implements MongooseOptionsFactory {
    constructor(
        private readonly __configSvc: ConfigService<IAllConfig>
    ) {}

    async createMongooseOptions(): Promise<MongooseModuleOptions> {
        let options:MongooseModuleOptions = {
            uri: this.__configSvc.getOrThrow("database.uri", {infer: true})
        }

        return options;
    }
}