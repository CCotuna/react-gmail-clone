import React, { useState } from 'react';
import app from '../firebase/firebaseConfig';
import { getDatabase, ref, set, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

function Chat() {
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const auth = getAuth();  

  const saveData = async () => {
    const db = getDatabase(app);
    const currentUser = auth.currentUser; 

    if (currentUser) {
      const receiverEmail = inputValue2; 
      const messageContent = inputValue1; 

      const timestamp = Date.now();  

      
      const messageRef = ref(db, `emails`); 

      const newMessageRef = push(messageRef);  
      await set(newMessageRef, {
        senderEmail: currentUser.email,  
        senderId: currentUser.uid,       
        receiverEmail: receiverEmail,    
        message: messageContent,         
        timestamp: timestamp,            
      })
        .then(() => {
          alert('Message sent successfully');
        })
        .catch((error) => {
          alert('Message could not be sent: ' + error.message);
        });
    } else {
      alert('You must be logged in to send a message');
    }
  };

  return (
    <div className='flex flex-col space-y-5 w-96'>
      Write
      <input
        type="text"
        className='text-black'
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
      />
      <br />
      <input
        type="text"
        className='text-black'
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
      />
      <button onClick={saveData}>Send Message</button>
    </div>
  );
};

export default Chat;
