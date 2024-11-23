import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const ChatList = () => {
    const [participantEmail, setParticipantEmail] = useState('');
    const [conversations, setConversations] = useState([]);
    const auth = getAuth();
    const navigate = useNavigate();


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


        navigate(`/gmail/chat/${newConversationRef.key}`);
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
                    .map((key) => ({
                        id: key,
                        participants: data[key].participants,

                        otherParticipant: data[key].participants.find(email => email !== formattedEmail),
                        lastMessage: data[key].messages[data[key].messages.length - 1],
                    }));

                setConversations(userConversations);
            }
        });

    }, [auth.currentUser?.email]);


    const goToConversation = (conversationId) => {
        navigate(`/gmail/chat/${conversationId}`);
    };

    const formatEmail = (email) => {
        return email.replace(/_/g, '.').replace(/-/g, '@');
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg text-black">
                <input
                    type="email"
                    value={participantEmail}
                    onChange={(e) => setParticipantEmail(e.target.value)}
                    placeholder="Email participant"
                    className="p-2 rounded-lg"
                />
                <button
                    onClick={startConversation}
                    className="ml-4 p-2 bg-green-500 text-white rounded-lg"
                >
                    Începe conversația
                </button>
            </div>

            <div className="space-y-4 mt-4">
                {conversations.length > 0 ? (
                    conversations.map((conversation) => (
                        <div
                            key={conversation.id}
                            onClick={() => goToConversation(conversation.id)}
                            className="cursor-pointer p-4 bg-gray-700 rounded-lg hover:bg-gray-600"
                        >
                            <div className="flex justify-between items-center">
                                <p className="text-white font-semibold">
                                    {formatEmail(conversation.otherParticipant)}
                                </p>
                                {conversation.lastMessage && (
                                    <p className="text-gray-400 text-sm">

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
    );
};

export default ChatList;
