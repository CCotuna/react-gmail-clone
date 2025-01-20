import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebaseConfig';

const Chat = ({ conversationId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const auth = getAuth();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const db = getDatabase(app);
    const conversationRef = ref(db, `conversations/${conversationId}/messages`);
    const unsubscribe = onValue(conversationRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setMessages(Object.values(data));
      }
    });

    return () => unsubscribe();
  }, [conversationId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]); 

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const db = getDatabase(app);
    const userEmail = auth.currentUser?.email;
    const formattedEmail = userEmail.replace(/\./g, '_').replace('@', '-');
    const newMessageRef = push(ref(db, `conversations/${conversationId}/messages`));

    const timestamp = Date.now();

    await set(newMessageRef, {
      id: newMessageRef.key,
      content: newMessage,
      sender: formattedEmail,
      timestamp: timestamp,
    });

    setNewMessage('');
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    return date.toLocaleString('ro-RO', options);
  };

  const formatEmail = (email) => {
    return email.replace(/_/g, '.').replace(/-/g, '@');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => {
          const isCurrentUser = message.sender === auth.currentUser?.email.replace(/\./g, '_').replace('@', '-');
          return (
            <div
              key={message.id}
              className={`p-2 rounded-lg ${isCurrentUser ? 'border-b self-start text-right' : 'border-b self-start text-left'}`}
            >
              
              <p className="font-semibold">{formatEmail(message.sender)}</p>
              <p className='bg-gray-100 break-words whitespace-pre-wrap'>{message.content}</p>
              <p className="text-gray-400 text-sm">{formatTimestamp(message.timestamp)}</p>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-gray-700 rounded-lg flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Scrie un mesaj..."
          className="p-2 rounded-lg flex-grow"
        />
        <button
          onClick={sendMessage}
          className="p-2 bg-green-500 text-white rounded-lg"
        >
          Trimite
        </button>
      </div>
    </div>
  );
};

export default Chat;
