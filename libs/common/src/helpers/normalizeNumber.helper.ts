import { INormalizeNumber } from "../interfaces/normalizeNumber";
import { TNullable } from "../types/nullable.type";

export function normalizeNumber(phoneNumber: string): TNullable<INormalizeNumber> {
    const pattern = /^(\+?(595)|0)?(?<local>9[0-9]{2})(?<number>[0-9\-]{6})$/;
    
    try {
        phoneNumber = phoneNumber.replaceAll(new RegExp("[\n\r]", "g"), "");
        const { local, number } = pattern.exec(phoneNumber).groups;
        
        if (!local || !number) return null;
        
        const partial = `${local}${number}`;
        return {
            local: `${partial ? "0" + partial : null}`,
            msisdn: `+595${partial}`,
            number: number
        }
    } catch {
        return null;
    }
}