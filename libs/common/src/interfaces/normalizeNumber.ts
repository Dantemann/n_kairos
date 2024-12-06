import { TNullable } from "../types/nullable.type";

export interface INormalizeNumber {
    msisdn: TNullable<string>;
    local: TNullable<string>;
    number: string;
}