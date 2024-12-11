import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractDocument } from "../schemas/abstract.schema";
import { Logger, NotFoundException } from "@nestjs/common";

export abstract class AbstractRepository<TDocument> extends AbstractDocument {
    protected abstract readonly _logger: Logger;

    constructor(
        protected readonly model: Model<TDocument>
    ) {
        super();
    }

    async create(document: Omit<TDocument, "_id"|"createdAt"|"updatedAt">): Promise<TDocument> {
        const createdDocument = new this.model({
            ...document,
            _id: new Types.ObjectId()
        });

        return (await createdDocument.save()).toJSON() as TDocument;
    }

    async find(filterQuery: FilterQuery<TDocument> = {}): Promise<TDocument[]> {
        return this.model.find(filterQuery).lean<TDocument[]>(true);
    }

    async findOne(filterQuery: FilterQuery<TDocument>, orFail: boolean = false): Promise<TDocument> {
        const document = await this.model.findOne(filterQuery).lean<TDocument>(true);

        if(orFail && !document) this._documentNotFoundException(filterQuery);

        return document;
    }

    async findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>, orFail: boolean = false): Promise<TDocument> {
        const document = await this.model.findOneAndUpdate(filterQuery, update, {new: true}).lean<TDocument>(true);

        if(orFail && !document) this._documentNotFoundException(filterQuery);

        return document;
    }

    async findOneAndDelete(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
        return this.model.findOneAndDelete(filterQuery).lean<TDocument>(true);
    }


    protected _documentNotFoundException(filterQuery: FilterQuery<TDocument>): never {
        this._logger.warn("Document not found with filterQuery", filterQuery);
        throw new NotFoundException("Document was not found");
    }
}