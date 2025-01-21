import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebaseConfig';

import EmptyChatImage from "@/assets/images/EmptyChat.png";
import { formatChatDate } from '../utils/date/formatDate';
import Chat from './Chat';

const ChatList = () => {
    const [participantEmail, setParticipantEmail] = useState('');
    const [conversations, setConversations] = useState([]);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const auth = getAuth();

    const startConversation = async () => {
        if (!participantEmail.trim()) return;

        const db = getDatabase(app);
        const userEmail = auth.currentUser?.email;
        const formattedEmail = userEmail.replace(/\./g, '_').replace('@', '-');
        const formattedParticipantEmail = participantEmail.replace(/\./g, '_').replace('@', '-');

        const newConversationRef = push(ref(db, 'conversations'));
        await set(newConversationRef, {
            participants: [formattedEmail, formattedParticipantEmail],
            messages: [],
        });

        setConversations(prev => [
            ...prev,
            {
                id: newConversationRef.key,
                participants: [formattedEmail, formattedParticipantEmail],
                otherParticipant: formattedParticipantEmail,
            }
        ]);

        setSelectedConversationId(newConversationRef.key);
        setParticipantEmail('');
    };

    useEffect(() => {
        const db = getDatabase(app);
        const userEmail = auth.currentUser?.email;
        const formattedEmail = userEmail.replace(/\./g, '_').replace('@', '-');

        const conversationsRef = ref(db, 'conversations');
        onValue(conversationsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const userConversations = Object.keys(data)
                    .filter((key) => data[key].participants.includes(formattedEmail))
                    .map((key) => {
                        const messages = data[key].messages;
                        const lastMessage = messages && Object.values(messages)
                            .sort((a, b) => b.timestamp - a.timestamp)[0];

                        return {
                            id: key,
                            participants: data[key].participants,
                            otherParticipant: data[key].participants.find(email => email !== formattedEmail),
                            lastMessage: lastMessage ? { content: lastMessage.content, timestamp: lastMessage.timestamp } : null,
                        };
                    });

                setConversations(userConversations);
            }
        });
    }, [auth.currentUser?.email]);

    const formatEmail = (email) => {
        return email.replace(/_/g, '.').replace(/-/g, '@');
    };

    const handleCloseChat = () => {
        setSelectedConversationId(null);
    };

    return (
        <div className="flex h-[calc(100vh-5rem)]">
            <div className="flex flex-col space-y-4 w-2/4 p-6 bg-gray-50 rounded-2xl">
                <p className="text-2xl">Acasă</p>

                <div className="flex items-center space-x-4 rounded-lg text-black">
                    <input
                        type="email"
                        value={participantEmail}
                        onChange={(e) => setParticipantEmail(e.target.value)}
                        placeholder="Email participant"
                        className="border py-2 ps-1 rounded-lg"
                    />
                    <button
                        onClick={startConversation}
                        className="ml-4 p-2 bg-red-800 text-white rounded-lg"
                    >
                        Începe conversația
                    </button>
                </div>

                <div className="space-y-4 mt-4">
                    {conversations.length > 0 ? (
                        conversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                onClick={() => setSelectedConversationId(conversation.id)}
                                className="cursor-pointer text-black"
                            >
                                <div className="flex items-center">
                                    <span className='py-3 px-5 rounded-full flex items-center justify-center bg-red-800 text-white uppercase'>{conversation.otherParticipant[0]}</span>

                                    <div className='flex flex-col ms-3 -space-y-1 border-b w-full'>
                                        <p className="font-semibold">
                                            {formatEmail(conversation.otherParticipant)}
                                        </p>

                                        {conversation.lastMessage && (
                                            <p className="text-sm text-black mt-1">
                                                {conversation.lastMessage.content && conversation.lastMessage.content.length > 60
                                                    ? conversation.lastMessage.content.substring(0, 60) + "..."
                                                    : conversation.lastMessage.content}
                                            </p>
                                        )}

                                    </div>
                                    {conversation.lastMessage && conversation.lastMessage.timestamp && (
                                        <p className="text-sm text-gray-400">
                                            {formatChatDate(conversation.lastMessage.timestamp)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-white">Nu ai nici o conversație activă.</p>
                    )}
                </div>
            </div>

            <div className="w-2/4 ps-2 relative">
                {selectedConversationId ? (
                    <div>
                        <button
                            onClick={handleCloseChat}
                            className="mb-4 p-2 absolute left-1/2 top-2 transform -translate-x-1/2 bg-red-800 text-white rounded-lg"
                        >
                            Închide Chat
                        </button>
                        <Chat conversationId={selectedConversationId} />
                    </div>
                ) : (
                    <div className='flex flex-col h-[calc(100vh-5rem)] text-black bg-white rounded-2xl text-center items-center justify-center'>
                        <img src={EmptyChatImage} alt="Empty Chat" />
                        <p className='text-lg font-medium'>Nicio conversatie selectata.</p>
                        <p >Foloseste comutatorul pentru a trece de <br /> la modul panou unic la cel divizat.</p>

                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatList;
