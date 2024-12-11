import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "@app/common/modules/database/repositories/abstract.repository";
import { ECollectionNames } from "@app/common/enums/collectionNames.enum";
import { CredentialsAbstractDocument } from "./schemas/credentials.schema";

@Injectable()
export class CredentialsRepository<T = any> extends AbstractRepository<CredentialsAbstractDocument> {
    protected _logger: Logger = new Logger(CredentialsRepository.name);

    constructor(
        @InjectModel(ECollectionNames.credentials)
        protected readonly model: Model<CredentialsAbstractDocument>
    ) {
        super(model)
    }

    protected _validateCredentials<T>(credentials: T) {}
}