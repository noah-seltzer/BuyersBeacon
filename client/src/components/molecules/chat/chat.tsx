import { Button } from "@/components/atoms/button";
import BodyText from "@/components/atoms/text/body";
import { MoveRight } from 'lucide-react'

import { Chat } from "@/types/chat";

interface ChatItemProps {
    chat: Chat;
    selectChat: (_chat: Chat) => any
}

const ChatItem = ({ chat, selectChat }: ChatItemProps) => {
    return (
        <div
            onClick={() => selectChat(chat)}
            className="px-4 py-3 border-b border-zinc-700/50 w-full flex flex-row items-center justify-between hover:bg-zinc-800/50 transition-colors duration-200 cursor-pointer">
            <BodyText className="text-zinc-200 font-medium truncate max-w-[80%]">
                {chat.Beacon?.ItemName || "Unknown Chat"}
            </BodyText>
            <Button
                variant='ghost'
                size='icon'
                className='text-zinc-400 hover:text-zinc-100 transition-colors duration-200'
            >
                <MoveRight className="w-5 h-5" />
            </Button>
        </div>
    );
};

export default ChatItem;