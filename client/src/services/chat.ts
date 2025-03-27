import { HubConnectionBuilder, HubConnection, LogLevel } from '@microsoft/signalr';
import { ChatMessage } from "@/types/chat-message"
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';

interface UseChatResults {
    sendMessage: (_message: ChatMessage) => Promise<void>,
    isConnected: boolean
}

interface UseChatProps {

}
const useChat = ({ }: UseChatProps): UseChatResults => {
    const { isSignedIn, isLoaded } = useAuth();
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
                console.log("Connected to SignalR");
            })
            .catch((err) => console.error("Connection error:", err));

        connection.onclose(() => {
            setConnected(false);
            setConnection(connection);
            setConnectionCreated(false);
            console.log("Disconnected from SignalR");
        });

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

    return {
        sendMessage,
        isConnected: connected
    }

}

export default useChat; 