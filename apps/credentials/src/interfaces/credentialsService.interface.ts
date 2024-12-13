import { CredentialsAbstractDocument } from "../schemas/credentials.schema";
import { CreateCredentialsDto } from "../dtos/credentials.dto";

export interface CredentialAbstractService<B= CreateCredentialsDto,R = CredentialsAbstractDocument> {
    createCredentials(body: B): Promise<R>
}

export interface ICredentialsServices<B= CreateCredentialsDto,R = CredentialsAbstractDocument> {
    [type: string]: CredentialAbstractService<B, R>
}