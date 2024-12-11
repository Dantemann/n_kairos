import { ECollectionNames } from "@app/common/enums/collectionNames.enum";
import { EMessagingChannels, EMessagingTargets } from "../modules/messaging/enums/messaging.enum";

export enum ECredentialsTypes {
    "Messaging" = "Messaging"
}

export enum ECredentialsNames {
    "MessagingTwilioSms" = `${ECollectionNames.credentials}_${ECredentialsTypes.Messaging}_${EMessagingChannels.Twilio}_${EMessagingTargets.SMS}`,
    "MessagingVonageSms" = `${ECollectionNames.credentials}_${ECredentialsTypes.Messaging}_${EMessagingChannels.Vonage}_${EMessagingTargets.SMS}`
}