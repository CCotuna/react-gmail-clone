import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebaseConfig';

function Email() {
  const { emailId } = useParams();
  const [emailDetails, setEmailDetails] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchEmailDetails = async () => {
      const db = getDatabase(app);
      const userEmail = auth.currentUser?.email;
      if (!userEmail) return;

      const formattedEmail = userEmail.replace(/\./g, '_').replace('@', '-');
      const dbRef = ref(db, `emails/${formattedEmail}/${emailId}`);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        setEmailDetails(snapshot.val());
      } else {
        console.log('Email not found!');
      }
    };

    fetchEmailDetails();
  }, [emailId, auth.currentUser?.email]);

  if (!emailDetails) return <div>Loading...</div>;

  console.log(emailDetails, 'emailDetails');

  return (
    <div className="text-white">
      <h1>{emailDetails.subject}</h1>
      <p>{emailDetails.message}</p>
      <p><strong>From:</strong> {emailDetails.senderEmail}</p>
      <p><strong>To:</strong> {emailDetails.receiverEmail}</p>
      <p><strong>Archived: </strong>{emailDetails.archived ? 'Yes' : 'No'}</p>
      <p><strong>Checked: </strong>{emailDetails.checked ? 'Yes' : 'No'}</p>
      <p><strong>Deleted: </strong>{emailDetails.deleted ? 'Yes' : 'No'}</p>
      <p><strong>Important: </strong>{emailDetails.important ? 'Yes' : 'No'}</p>
      <p><strong>Read: </strong>{emailDetails.read ? 'Yes' : 'No'}</p>
      <p><strong>Sent by Me: </strong>{emailDetails.sentByMe ? 'Yes' : 'No'}</p>
      <p><strong>signedBy </strong>{emailDetails.signedBy}</p>
      <p><strong>Starred: </strong>{emailDetails.star ? 'Yes' : 'No'}</p>
      <p><strong>Date:</strong> {new Date(emailDetails.timestamp).toLocaleString()}</p>
    </div>
  );
}

export default Email;
