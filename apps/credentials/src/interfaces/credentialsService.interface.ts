import { CredentialsAbstractDocument } from "../schemas/credentials.schema";
import { CreateCredentialsDto } from "../dtos/credentials.dto";

export interface CredentialAbstractService<T = CredentialsAbstractDocument> {
    createCredentials(body: CreateCredentialsDto): Promise<T>
}

export interface ICredentialsServices {
    [type: string]: CredentialAbstractService<CredentialsAbstractDocument>
}