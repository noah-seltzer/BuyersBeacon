import { User } from "@/types/user";
import { Beacon } from "@/types/beacon";
import { ChatMessage } from "@/types/chat-message";

export interface Chat {
    ChatId: string,
    BeaconId: string,
    Beacon?: Beacon,
    Participants: User[],
    Messages: ChatMessage[],
}