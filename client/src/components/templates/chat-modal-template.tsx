"use client";

import React from 'react';

interface ChatModalTemplateProps {
    open: boolean,
    setClosed: () => any,
    messages: string[]
}


const ChatModalTemplate: React.FC<ChatModalTemplateProps> = ({ messages, setClosed, open }: ChatModalTemplateProps) => {

    if (!open) return null;


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-background rounded-lg shadow-xl w-96 h-[500px] flex flex-col border-2 border-primary">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">Chat</h2>
                    <button
                        onClick={setClosed}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        Close
                    </button>
                </div>

                <div className="flex-grow overflow-y-auto p-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                        // className={`mb-2 p-2 rounded ${message.isCurrentUser
                        //     ? 'bg-blue-100 text-right'
                        //     : 'bg-gray-100 text-left'
                        //     }`}
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
            </div>
        </div>
    );
};

export default ChatModalTemplate;