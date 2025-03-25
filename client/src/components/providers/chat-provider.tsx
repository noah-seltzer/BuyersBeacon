import React, {
    createContext,
    useState,
    useContext,
    ReactNode,
    useCallback
} from 'react';
import ChatModalTemplate from '../templates/chat-modal-template';

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
        console.log("OPEN CHAT", beaconId)
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




    return <ChatModalTemplate
        messages={[]}
        open={isOpen}
        setClosed={closeChat}
    />
}