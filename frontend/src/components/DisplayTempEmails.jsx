import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebaseConfig';

function DisplayTempEmails() {
  const [emails, setEmails] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchEmails = async () => {
      const db = getDatabase(app);
      const email = auth.currentUser?.email;
      
      if (!email) return;

      
      const formattedEmail = email.replace(/\./g, '_').replace('@', '-');
      console.log(`Formatted email: ${formattedEmail}`);

      
      const dbRef = ref(db, `emails/${formattedEmail}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        console.log(`Branch exists for: ${formattedEmail}`);

        
        onValue(dbRef, (snapshot) => {
          if (snapshot.exists()) {
            const messages = [];
            snapshot.forEach((messageSnapshot) => {
              const messageData = messageSnapshot.val();
              console.log(messageData, "Message data");

              
              if (
                messageData.receiverEmail === email ||
                messageData.senderEmail === email
              ) {
                messages.push({
                  senderEmail: messageData.senderEmail,
                  receiverEmail: messageData.receiverEmail,
                  message: messageData.message,
                  timestamp: new Date(messageData.timestamp).toLocaleString(),
                  subject: messageData.subject,
                  signedBy: messageData.signedBy,
                  read: messageData.read,
                  checked: messageData.checked,
                  star: messageData.star,
                  important: messageData.important,
                  archived: messageData.archived,
                  sentByMe: messageData.sentByMe,
                });
              }
            });

            setEmails(messages);
          } else {
            setEmails([]); 
          }
        });
      } else {
        console.log(`No branch found for: ${formattedEmail}`);
        setEmails([]); 
      }
    };

    fetchEmails();
  }, [auth.currentUser?.email]);

  return (
    <div>
      <h1>Your Messages</h1>
      <ul>
        {emails.length > 0 ? (
          emails.map((email, index) => (
            <li key={index}>
              <p>
                {email.sentByMe ? (
                  <>
                    You sent a message to <strong>{email.receiverEmail}</strong>.
                  </>
                ) : (
                  <>
                    <strong>{email.senderEmail}</strong> sent you a message.
                  </>
                )}
              </p>
              <div className="ms-10">
                <p>Subject: {email.subject}</p>
                <p>Message: {email.message}</p>
                <p>Sent at: {email.timestamp}</p>
              {/* <p>Signed By: {email.signedBy}</p> */}
              {/* <p>{email.read ? "Read" : "Unread"}</p> */}
              {/* <p>{email.star ? "Starred" : "Not Starred"}</p> */}
              {/* <p>{email.important ? "Important" : "Not Important"}</p> */}
              {/* <p>{email.archived ? "Archived" : "Not Archived"}</p> */}
              {/* <p>{email.sentByMe ? "Sent by you" : "Sent by others"}</p> */}
              </div>
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
