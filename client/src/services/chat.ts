import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { ChatMessage } from "@/types/chat-message"
import { useCallback, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { Chat } from '@/types/chat';
import { useLazyGetChatQuery } from '@/redux/api';

interface UseChatResults {
    sendMessage: (_message: ChatMessage) => Promise<void>,
    isConnected: boolean,
    initializeChat: (_beaconId: string) => Promise<boolean>,
}

interface UseChatProps {
    onNewChat: (_chat: Chat) => any;
    handleRecieveMessage: (chatId: string, senderId: string, message: string) => Promise<void> | void;
}

export enum SINGAL_R_EVENTS {
    RECIEVE_MESSAGE = "ReceiveMessage",
    NEW_CHAT = "NewChat"
}


const useChat = ({
    onNewChat,
    handleRecieveMessage
}: UseChatProps): UseChatResults => {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const [getChat] = useLazyGetChatQuery();
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [connectionCreated, setConnectionCreated] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);

    // Connect when signedIn, 
    useEffect(() => {
        if (isLoaded && isSignedIn && !connectionCreated) {
            const newConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5037/chathub', {})
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            setConnection(newConnection);
            setConnectionCreated(true);

            return () => {
                if (connection) {
                    connection.stop();
                }
            };

        }
    }, [isSignedIn, connectionCreated, connection, isLoaded])

    useEffect(() => {
        if (!connection) return;

        connection
            .start()
            .then(() => {
                setConnected(true);
            })
            .catch((err) => console.error("Connection error:", err));

        connection.onclose(() => {
            setConnected(false);
            setConnection(connection);
            setConnectionCreated(false);
        });

        return () => {
            connection.off("messageReceived");
        };
    }, [connection]);


    const handleNewChat = useCallback(async (chatId: string, _beaconId: string, participants: string[]) => {
        // See if message applies to CLU
        if (!user || !participants.some(p => p === user.id)) return;

        const res = await getChat({ chatId, clerkId: user.id });

        if (!res.data) return;

        onNewChat(res.data)
    }, [user, onNewChat]);


    // Set up listeners
    useEffect(() => {

        if (!connection || !connectionCreated) return;

        // Remove old ones.
        connection.off(SINGAL_R_EVENTS.NEW_CHAT)
        connection.off(SINGAL_R_EVENTS.RECIEVE_MESSAGE)

        // Set up listeners
        connection.on(SINGAL_R_EVENTS.RECIEVE_MESSAGE, handleRecieveMessage);
        connection.on(SINGAL_R_EVENTS.NEW_CHAT, handleNewChat);
    }, [connection, connectionCreated, handleNewChat, handleRecieveMessage])


    const sendMessage = useCallback(async (message: ChatMessage): Promise<void> => {
        if (!connection) throw Error("Connection must be created before sending message");
        try {
            await connection.invoke("SendMessage", message.ChatId, message.Message);
        } catch (err) {
            console.log("Error sending message", err);
        }
    }, [connected, connection])

    const initializeChat = useCallback(async (beaconId: string): Promise<boolean> => {
        if (!connection) throw Error("Connection must be created before initializing chat");
        if (!user) throw Error("User must be logged in and exist before initailizing chat");
        try {
            await connection.invoke("InitializeChat", beaconId, user.id)
            toast.success("Chat initialized.")
            return true
        } catch (err: any) {
            toast.error("Error intializing chat. Please try again.")
            return false;
        }

    }, [user, connection])



    return {
        sendMessage,
        isConnected: connected,
        initializeChat,
    }

}

export default useChat; 