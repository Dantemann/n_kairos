import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ISuperFactoryReturns } from "./interfaces/factory.interface";
import { EFactoryType } from "./enums/factoryTypes.enum";
import { MessagingFactorySercice } from "./messagingFactory.service";

@Injectable()
export class SuperFactoryService {
    constructor(
        private readonly __messagingFactory: MessagingFactorySercice
    ) {}

    async getFactory<K extends keyof ISuperFactoryReturns>(factoryType: K): Promise<ISuperFactoryReturns[K]> {
        switch(factoryType) {
            case EFactoryType.Messaging:
                return this.__messagingFactory;
            default:
                throw new InternalServerErrorException(`Factory type "${factoryType}" is not valid`);
        }
    }
}