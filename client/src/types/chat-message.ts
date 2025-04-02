import { User } from "@/types/user";
import { Chat } from "@/types/chat";

export interface ChatMessage {
    ChatMessageId?: string,
    ChatId: string,
    Chat?: Chat,
    UserId: string,
    User?: User,
    Message: string,
    SendDateTime?: Date,
}