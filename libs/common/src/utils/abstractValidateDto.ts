import { BadRequestException } from "@nestjs/common";
import { Exclude,  } from "class-transformer";
import { IsArray, validateOrReject, ValidationError } from "class-validator";

export abstract class AbstractValidateDto {
    @Exclude()
    @IsArray()
    protected abstract _properties: string[];

    protected async _allocNew<T>(body: object, Dto: any = null ): Promise<T> {
        this._properties.forEach( property => {
            Dto[property] = body?.[property];
        });

        try {
            await validateOrReject(Dto as object, { forbidNonWhitelisted: true, whitelist: true });
        } catch( error ) {
            const errors: string[] = [];

            (error as ValidationError[]).forEach( error => {
                Object.values(error.constraints).forEach( constraint => {
                    errors.push(constraint);
                })
            });

            throw new BadRequestException(errors);
        }

        return Dto;
    }
}