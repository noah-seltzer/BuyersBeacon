import { User } from "@/types/user";
import { Beacon } from "@/types/beacon";
import { ChatMessage } from "@/types/ChatMessage";

export interface Chat {
    ChatId: string,
    BeacondId: string,
    Beacon?: Beacon,
    Participants: User[],
    Messages: ChatMessage[],
}