import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebaseConfig';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Chat = ({ conversationId}) => {
  // const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const auth = getAuth();

  useEffect(() => {
    const db = getDatabase(app);
    const conversationRef = ref(db, `conversations/${conversationId}/messages`);
    const unsubscribe = onValue(conversationRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setMessages(Object.values(data));
      }
    });

    return () => {

    };
  }, [conversationId]);


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
    <div className="flex flex-col rounded-2xl bg-white h-[calc(100vh-5rem)]">
      {/* <Link to={'/gmail/chat'} className="text-white">Back to chats</Link> */}
      <div className="p-4  rounded-lg text-white space-y-2">
        {messages.map((message) => {
          const isCurrentUser = message.sender === auth.currentUser?.email.replace(/\./g, '_').replace('@', '-');
          return (
            <div
              key={message.id}
              className={`p-2 rounded-lg ${
                isCurrentUser ? 'bg-gray-500 self-end text-right' : 'bg-gray-700 self-start text-left'
              }`}
            >
              <p className="font-semibold">{formatEmail(message.sender)}</p>
              <p>{message.content}</p>
              <p className="text-gray-400 text-sm">{formatTimestamp(message.timestamp)}</p>
            </div>
          );
        })}
      </div>
      <div className="flex space-x-4 p-4 bg-gray-700 rounded-lg">
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