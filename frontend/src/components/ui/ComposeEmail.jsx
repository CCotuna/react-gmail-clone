import React, { useState } from 'react';
import app from '../../firebase/firebaseConfig';
import { getDatabase, ref, set, push } from 'firebase/database';
import { getAuth } from 'firebase/auth';

function ComposeEmail({ onClose }) {
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
            onClose();
        } else {
            alert('You must be logged in to send a message');
        }
    };

    return (
        <div className="flex flex-col p-2 px-3">
            <div className='flex flex-col space-y-2 w-96 text-black'>
           <div className='flex space-x-2 border-b'> <label>Către</label>
                <input
                    type="email"
                    className='text-black w-full px-1 focus:outline-none'
                    value={inputValue2}
                    onChange={(e) => setInputValue2(e.target.value)}
                /></div>
               <div className='flex items-center space-x-2 border-b'>
               {/* <label className='text-sm text-gray-400'>Subiect</label> */}
                <input
                    type="text"
                    className='text-black w-full focus:outline-none'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder='Subiect'
                />
               </div>
                <textarea
                    type="text"
                    className='text-black h-72 focus:outline-none'
                    value={inputValue1}
                    onChange={(e) => setInputValue1(e.target.value)}
                    placeholder="Enter your message"
                />
                <div className='flex'>
                    <button className='bg-blue-600 text-white p-2 px-5 rounded-full w-fit' onClick={saveData}>Trimite</button>
                </div>
            </div>
        </div>
    );
};

export default ComposeEmail;
