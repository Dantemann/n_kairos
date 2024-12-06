import { Schema } from "mongoose";

export interface ICredentialCollectionInfo {
    name: string;
    schema: Schema;
    type: {
        [type: string]: ICredentialType
    }
}

export interface ICredentialType {
    [discriminator: string]: {
        name: string;
        discriminator: string;
        schema: Schema;
    }
}