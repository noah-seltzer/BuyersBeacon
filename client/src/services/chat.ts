import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { ChatMessage } from "@/types/chat-message"
import { useCallback, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { Chat } from '@/types/chat';

interface UseChatResults {
    sendMessage: (_message: ChatMessage) => Promise<void>,
    isConnected: boolean,
    initializeChat: (_beaconId: string) => Promise<boolean>
}

interface UseChatProps {
    onNewChat: (_chat: Chat) => void
}

const useChat = ({ }: UseChatProps): UseChatResults => {
    const { isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [connectionCreated, setConnectionCreated] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);


    const onNewChat = (chatId: string, beaconId: string, recipientId: string) => {
        console.log(`📩 [NewChat] Received on client -> ChatId: ${chatId}, BeaconId: ${beaconId}, User: ${recipientId}`);
        toast.success(`New chat started with ${recipientId}`);
    }

    const onRecieveMessage = (chatId: string, senderId: string, message: string) => {
        console.log(`New chat initialized - ChatId: ${chatId},  User: ${senderId}, Message: ${message}`);
        toast.success(`New chat started with ${senderId}`);
    }

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
                console.log("Connected to SignalR");
            })
            .catch((err) => console.error("Connection error:", err));

        connection.onclose(() => {
            setConnected(false);
            setConnection(connection);
            setConnectionCreated(false);
            console.log("Disconnected from SignalR");
        });


        // Set up listeners
        connection.on("ReceiveMessage", onRecieveMessage);
        connection.on("NewChat", onNewChat);

        return () => {
            connection.off("messageReceived");
        };
    }, [connection]);




    const sendMessage = useCallback(async (message: ChatMessage): Promise<void> => {
        if (!connection) throw Error("Connection must be created before sending message");
        try {
            await connection.invoke("SendMessage", message.ChatId, message.Message);
            console.log("Message sent!");
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
        initializeChat
    }

}

export default useChat; 