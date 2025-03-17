import * as singnalR from '@microsoft/signalr';
import { ChatMessage } from "@/types/ChatMessage"
import { useState } from 'react';

interface UseChatResults {
    startConnection: (_userId: string) => Promise<void>,
    sendMessage: (_chatId: string) => Promise<ChatMessage | null>
}

interface UseChatProps {

}
const useChat = ({ }: UseChatProps): UseChatResults => {
    const [connected, setConnected] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>(null);

    const startConnection = async (userId: string) => {

    }

    const sendMessage = async (chatId: string): Promise<ChatMessage | null> => {
        return null;
    }

    return {
        startConnection,
        sendMessage
    }

}

export default useChat; 