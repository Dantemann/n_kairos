import { EFactoryType } from "../enums/factoryTypes.enum";
import { MessagingFactorySercice } from "../messagingFactory.service";

export interface ISuperFactoryReturns {
    [EFactoryType.Messaging]: MessagingFactorySercice
}