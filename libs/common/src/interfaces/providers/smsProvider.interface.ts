import { INormalizeNumber } from "../normalizeNumber";

export interface ISmsProviderParams {
    to: string;
    message: string;
}

export interface ISmsProviderParsedParams {
    to: INormalizeNumber;
    message: string;
}