import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebaseConfig';

function DisplayTempEmails() {
  const [emails, setEmails] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'emails');

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const messages = [];
        snapshot.forEach((messageSnapshot) => {
          const messageData = messageSnapshot.val();

          if (messageData.receiverEmail === auth.currentUser?.email) {
            messages.push({
              senderEmail: messageData.senderEmail,
              receiverEmail: messageData.receiverEmail,
              message: messageData.message,
              timestamp: new Date(messageData.timestamp).toLocaleString(),
            });
          }
        });

        setEmails(messages); 
      } else {
        setEmails([]); 
      }
    });

    return () => unsubscribe();  
  }, [auth.currentUser?.email]);  

  return (
    <div>
      <h1>Your Messages</h1>
      <ul>
        {emails.length > 0 ? (
          emails.map((email, index) => (
            <li key={index}>
              <p><strong>{email.senderEmail}</strong> sent you a message.</p>
              <p>Message: {email.message}</p>
              <p>Sent at: {email.timestamp}</p>
            </li>
          ))
        ) : (
          <p>No messages available.</p>
        )}
      </ul>
    </div>
  );
}

export default DisplayTempEmails;
