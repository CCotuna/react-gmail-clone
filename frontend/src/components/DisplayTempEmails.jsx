import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import app from '../firebase/firebaseConfig';

function DisplayTempEmails() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'chat/test');

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        setEmails(Object.values(snapshot.val()));
      } else {
        setEmails([]); 
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Temporary Emails</h1>
      <ul>
        {emails.length > 0 ? (
          emails.map((email, index) => (
            <li key={index}>
              <p>
                <strong>{email.user}</strong>: {email.message}
              </p>
            </li>
          ))
        ) : (
          <p>No emails available.</p>
        )}
      </ul>
    </div>
  );
}

export default DisplayTempEmails;
