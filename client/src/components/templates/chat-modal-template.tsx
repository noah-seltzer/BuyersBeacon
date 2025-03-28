"use client";

import { Chat } from '@/types/chat';
import React from 'react';
import { ArrowLeftFromLine, Minimize } from 'lucide-react'
import { Button } from '../atoms/button';
import EmptyState from '../molecules/empty-state';
import ChatListing from '../molecules/chat/chat';

interface ChatModalTemplateProps {
    open: boolean,
    setClosed: () => any,
    messages: string[],
    chats: Chat[],
    focusedChat: Chat | null,
    unFocusChat: () => any
    focusChat: (_chat: Chat) => any
}


const ChatModalTemplate: React.FC<ChatModalTemplateProps> = ({ messages, setClosed, open, chats, focusedChat, unFocusChat, focusChat }: ChatModalTemplateProps) => {

    if (!open) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-background rounded-lg shadow-xl w-96 h-[500px] flex flex-col border-2 border-primary">
                <div className="flex justify-between items-center p-4 border-b">
                    {
                        focusedChat ?
                            <Button
                                variant='ghost'
                                size='icon'
                                className='text-foreground/80'
                                onClick={unFocusChat}
                            >
                                <ArrowLeftFromLine size={25} style={{
                                    height: '25px',
                                    width: '25px',
                                }} />
                            </Button>
                            :
                            <h2 className="text-xl font-semibold">Chats</h2>
                    }
                    <Button
                        onClick={setClosed}
                        variant='ghost'
                        size='icon'
                        className='text-foreground/80'
                    >
                        <Minimize size={25} style={{
                            height: '25px',
                            width: '25px',
                        }} />
                    </Button>
                </div>
                {
                    focusedChat ?
                        <>
                            <div className="flex-grow overflow-y-auto p-4">
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`mb-2 p-2 rounded ${true
                                            ? 'bg-blue-100 text-right'
                                            : 'bg-gray-100 text-left'
                                            }`}
                                    >
                                        FUCK
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="w-full p-2 border rounded"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            // sendMessage(e.currentTarget.value);
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                            </div>
                        </>
                        :
                        <>
                            {
                                chats.length === 0 ?
                                    <div className="flex items-center justify-center h-full w-full">
                                        <EmptyState
                                            iconH={100}
                                            iconW={100}
                                            primaryText="No chats found"
                                        />
                                    </div>
                                    :
                                    <div className="flex flex-col items-center overflow-y-auto">
                                        {chats.map(c => <ChatListing
                                            chat={c}
                                            selectChat={focusChat}
                                        />)}
                                    </div>

                            }
                        </>
                }
            </div>
        </div>
    );
};

export default ChatModalTemplate;