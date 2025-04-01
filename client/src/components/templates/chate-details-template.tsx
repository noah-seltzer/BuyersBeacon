import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useLazyGetChatQuery, useLazyGetUserByClerkIdQuery } from '@/redux/api';
import { useAuth } from '@clerk/nextjs';
import { Chat } from '@/types/chat';
import { User } from '@/types/user';
import { ChatMessage } from '@/types/chat-message';
import useChat from '@/services/chat';

interface ChatDetailsTemplateProps {
  
}

const ChatDetailsTemplate = ({}: ChatDetailsTemplateProps) => {
  const { id } = useParams();
  const { userId: clerkId, isSignedIn } = useAuth();
  const [getChat] = useLazyGetChatQuery();
  const [getUserByClerkId] = useLazyGetUserByClerkIdQuery();
  const [chat, setChat] = useState<Chat | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState('');

  const handleReceiveMessage = (chatId: string, senderId: string, message: string) => {
    if (chat && chat.ChatId === chatId) {
      const newMessage: ChatMessage = {
        ChatId: chatId,
        UserId: senderId,
        Message: message
      };
      setMessages(prevMessages => [...prevMessages, newMessage]);
    }
  };

  const handleNewChat = () => {
    // No new chat handling needed in this component as we're viewing a specific chat
  };

  const { sendMessage, isConnected } = useChat({
    onNewChat: handleNewChat,
    handleRecieveMessage: handleReceiveMessage
  });

  const loadChat = async () => {
    if (!isSignedIn || !clerkId || !id) return;
    
    try {
      // First get the user info
      const userResponse = await getUserByClerkId(clerkId);
      if (userResponse.data) {
        setUser(userResponse.data);
      }

      // Then get the chat info
      const chatResponse = await getChat({ chatId: id as string, clerkId });
      if (chatResponse.data) {
        setChat(chatResponse.data);
        setMessages(chatResponse.data.Messages || []);
      }
    } catch (error) {
      console.error('Error loading chat:', error);
    }
  };

  useEffect(() => {
    if (isSignedIn && clerkId && id) {
      loadChat();
    }
  }, [isSignedIn, clerkId, id]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !chat || !user) return;
    
    const message: ChatMessage = {
      ChatId: chat.ChatId,
      UserId: user.UserId,
      Message: messageText
    };
    
    try {
      await sendMessage(message);
      setMessageText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!chat || !user) {
    return <div className="flex justify-center items-center h-screen">Loading chat...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">
            {chat.Beacon?.ItemName || 'Chat'}
          </h2>
        </div>
        
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500">No messages yet</div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.UserId === user.UserId ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`
                    px-4 py-2 rounded-lg max-w-[80%]
                    ${msg.UserId === user.UserId 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800'}
                  `}
                >
                  {msg.Message}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="border-t p-4 flex">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Type a message..."
            className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors disabled:bg-blue-300"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetailsTemplate;