import React, { useState } from 'react';
import app from '../firebase/firebaseConfig';
import { getDatabase, ref, set, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

function ComposeEmail() {
  const [inputValue1, setInputValue1] = useState(''); 
  const [inputValue2, setInputValue2] = useState(''); 
  const [subject, setSubject] = useState(''); 
  const auth = getAuth();  

  const saveData = async () => {
    const db = getDatabase(app);
    const currentUser = auth.currentUser; 

    if (currentUser) {
      const receiverEmail = inputValue2; 
      const messageContent = inputValue1; 
      const subjectText = subject || "No Subject"; 
      const timestamp = Date.now();  
      const signedBy = currentUser.email.split('@')[1];  
      const read = false;
      const checked = false;
      const star = false;
      const important = false;
      const archived = false;
      const deleted = false;

      
      const encodedSenderEmail = currentUser.email.replace(/\./g, '_').replace('@', '-');
      const encodedReceiverEmail = receiverEmail.replace(/\./g, '_').replace('@', '-'); 

      
      const messageRefForReceiver = ref(db, `emails/${encodedReceiverEmail}`);
      const newMessageRefReceiver = push(messageRefForReceiver);  
      await set(newMessageRefReceiver, {
        senderEmail: currentUser.email,  
        senderId: currentUser.uid,       
        receiverEmail: receiverEmail,    
        message: messageContent,         
        timestamp: timestamp,            
        subject: subjectText,
        signedBy: signedBy,
        read: read,
        checked: checked,
        star: star,
        important: important,
        archived: archived,
        deleted: deleted,
        sentByMe: false,  
      });

      
      const messageRefForSender = ref(db, `emails/${encodedSenderEmail}`);
      const newMessageRefSender = push(messageRefForSender);
      await set(newMessageRefSender, {
        senderEmail: currentUser.email,  
        senderId: currentUser.uid,       
        receiverEmail: receiverEmail,    
        message: messageContent,         
        timestamp: timestamp,            
        subject: subjectText,
        signedBy: signedBy,
        read: false,
        checked: false,
        star: false,
        important: false,
        archived: false,
        deleted: false,
        sentByMe: true,  
      });

      alert('Message sent successfully');
    } else {
      alert('You must be logged in to send a message');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6 bg-gray-50 rounded-2xl">
    <div className='flex flex-col space-y-5 w-96 text-black'>
      <label>Subject</label>
      <input
        type="text"
        className='text-black'
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Enter subject"
      />
      <br />
      <label>Message</label>
      <input
        type="text"
        className='text-black'
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)}
        placeholder="Enter your message"
      />
      <br />
      <label>Receiver Email</label>
      <input
        type="email"
        className='text-black'
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)}
        placeholder="Enter receiver's email"
      />
      <br />
      <button onClick={saveData}>Send Message</button>
    </div>
    </div>
  );
};

export default ComposeEmail;
