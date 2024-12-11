import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateCredentialsDto } from "./dtos/credentials.dto";
import { CredentialsService } from "./credentials.service";

@Controller("credentials")
export class CredentialsController {
    constructor(
        private readonly __credentialsService: CredentialsService
    ) {}
    @Post('')
    async createCredential(@Body() body: CreateCredentialsDto) {
        return await this.__credentialsService.createCredential(body);
    }
}