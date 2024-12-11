import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ECollectionNames } from "@app/common/enums/collectionNames.enum";
import { DatabaseModule } from "@app/common/modules/database/database.module";
import { MessagingCredentialsService } from "./services/messagingCredentials.service";
import { TwilioSmsCredentialService } from "./services/twilioSmsCredential.service";
import { TwilioSmsCredentialsSchema } from "./schemas/sms/twilioSms.schema";
import { CredentialsSchema } from "../../schemas/credentials.schema";
import { ECredentialsNames } from "../../enums/credentials.enum";
import { TwilioSmsCredentialRepository } from "./repositories/twilioSmsCredential.repository";
import { VonageSmsCredentialService } from "./services/vonageSmsCredential.service";
import { VonageSmsCredentialRepository } from "./repositories/vonageSmsCredential.repository";
import { VonageSmsCredentialsSchema } from "./schemas/sms/vonageSms.schema";

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([
            {
                name: ECollectionNames.credentials, schema: CredentialsSchema, discriminators: [
                    //* Sms
                    {
                        name: ECredentialsNames.MessagingTwilioSms,
                        schema: TwilioSmsCredentialsSchema
                    },
                    {
                        name: ECredentialsNames.MessagingVonageSms,
                        schema: VonageSmsCredentialsSchema
                    }
                ]
            }
        ])
    ],
    providers: [
        MessagingCredentialsService,

        TwilioSmsCredentialService,
        TwilioSmsCredentialRepository,

        VonageSmsCredentialService,
        VonageSmsCredentialRepository
    ],
    exports: [
        MessagingCredentialsService
    ]
})
export class MessagingCredentialsModule { }