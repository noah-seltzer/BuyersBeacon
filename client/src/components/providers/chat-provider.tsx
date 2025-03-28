import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useCallback,
    useEffect
} from 'react';
import ChatModalTemplate from '../templates/chat-modal-template';
import { Chat } from '@/types/chat';
import { useLazyGetChatsQuery } from '@/redux/api';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import { skipToken } from '@reduxjs/toolkit/query';
import useChat from '@/services/chat';

// Define the shape of the chat context
interface ChatModalContextType {
    isOpen: boolean;
    currentBeaconId: string | null;
    openChat: (chatId?: string) => void;
    closeChat: () => void;
    toggleChat: () => void;
}

// Create the context with a default value
const ChatModalContext = createContext<ChatModalContextType>({
    isOpen: false,
    currentBeaconId: null,
    openChat: () => { },
    closeChat: () => { },
    toggleChat: () => { }
});

// Provider component
export const ChatModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentBeaconId, setCurrentBeaconId] = useState<string | null>(null);

    const openChat = useCallback((beaconId?: string) => {
        setCurrentBeaconId(beaconId ?? null);
        setIsOpen(true);
    }, []);

    const closeChat = useCallback(() => {
        setIsOpen(false);
        setCurrentBeaconId(null);
    }, []);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => !prev);
    }, []);

    const value = {
        isOpen,
        currentBeaconId,
        openChat,
        closeChat,
        toggleChat
    };

    return (
        <ChatModalContext.Provider value={value}>
            {children}
        </ChatModalContext.Provider>
    );
};

// Custom hook to use the chat modal context
export const useChatModal = () => {
    const context = useContext(ChatModalContext);

    if (!context) {
        throw new Error('useChatModal must be used within a ChatModalProvider');
    }

    return context;
};


export const ChatModalEngine = () => {
    const { isOpen, currentBeaconId, openChat, closeChat } = useChatModal();
    const [chats, setChats] = useState<Chat[]>([]);
    const [focusedChat, setFocusedChat] = useState<Chat | null>(null);
    const { isSignedIn, userId } = useAuth()
    const [getChats, { data: fetchedChats, isLoading, isError }] = useLazyGetChatsQuery()

    const unFocusChat = () => setFocusedChat(null);
    const focusChat = (chat: Chat) => setFocusedChat(chat);





    const handleRecieveMessage = (chatId: string, senderId: string, message: string) => {

    }

    const onNewChat = useCallback((chat: Chat) => {
        const chatIndex = chats?.findIndex(c => c.ChatId === chat.ChatId);

        if (chatIndex !== -1) return;

        toast.info("A new chat has appeared. Maybe its someone that needs your beacon.")
        setChats([chat, ...chats]);
    }, [chats])

    const { sendMessage, isConnected, initializeChat } = useChat({
        onNewChat,
        handleRecieveMessage
    })

    const handleBeaconIdChange = useCallback(async (currentBeaconId: null | string) => {
        // If chats is null return to home of chat modal 
        if (!chats) {
            return;
        }

        if (!currentBeaconId) {
            setFocusedChat(null);
            return;
        }

        // If Chat is not found locally attempt to get it
        const chat = chats.findIndex(c => c.BeaconId === currentBeaconId);

        if (chat === -1) {
            let toastId = toast.loading("Chat not found. Initializing new chat....");
            const res = await initializeChat(currentBeaconId);
            toast.dismiss(toastId);
            if (!res) return;
        } else {
            setFocusedChat(chats[chat]);
        }

        // If beacon is not found in api create a new chat with beacon owner. 
    }, [chats, initializeChat, isConnected])

    useEffect(() => {
        handleBeaconIdChange(currentBeaconId)
    }, [currentBeaconId, handleBeaconIdChange])

    const initializeState = useCallback(async (userId: string) => {
        const res = await getChats(userId);
        res.data && setChats([...res.data])
    }, [])

    useEffect(() => {
        if (isSignedIn && userId) {
            initializeState(userId);
        }
    }, [isSignedIn, userId, initializeState])

    console.log(chats)


    return <ChatModalTemplate
        messages={[]}
        open={isOpen}
        setClosed={closeChat}
        chats={chats}
        focusedChat={focusedChat}
        unFocusChat={unFocusChat}
        focusChat={focusChat}
    />
}