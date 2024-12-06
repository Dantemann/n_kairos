import { IAppConfig } from "./appConfig.interface";
import { IDatabaseConfig } from "./databaseConfig.interface";

export interface IAllConfig {
    app: IAppConfig
    database: IDatabaseConfig
}