import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../firebase/firebaseConfig';

import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

import { MdLabelImportant, MdStarBorder, MdStar } from "react-icons/md";
import { IoReturnUpForwardOutline } from "react-icons/io5";
import { IoReturnUpBack } from "react-icons/io5";

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
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6 bg-gray-50 rounded-2xl">
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <Link to={'/gmail/mail'} className="cursor-pointer rounded-full text-2xl">
            <IoArrowBackOutline />
          </Link>
        </div>
        <div>
          <span>Alte icons care vor functiona pe baza id din params</span>
        </div>
      </div>

      <div className='flex items-center ms-16 text-2xl justify-between'>
        <div className='flex items-center space-x-3'>
          <h1>{emailDetails.subject}</h1>
          <p>{emailDetails.important ? (<MdLabelImportant className="text-yellow-500" />) : ''}</p>
          <p>{emailDetails.sentByMe ? '' : (<span className='text-sm bg-gray-300 text-black'>Mesaje Primite</span>)}</p>
        </div>
        <div className='flex'>
          <span>Icons</span>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex'>
          <span className='py-2 px-5 rounded-full flex items-center justify-center bg-green-500 text-white'>C</span>
          <div className='flex flex-col ms-3'>
            <div className='font-semibold'>{emailDetails.senderEmail}</div>
            <div>catre {emailDetails.sentByMe ? (<span>{emailDetails.receiverEmail}</span>) : 'eu'}</div>
          </div>
        </div>
        <div className='text-2xl'>
          <p>{emailDetails.star ? (<MdStar className="text-yellow-500" />) : (<MdStarBorder />)}</p>
        </div>
      </div>

      <div className='ms-16 mt-6 max-w-5xl'>
        <p>{emailDetails.message}</p>
      </div>

      <div className='ms-16 mt-6 flex items-center space-x-5'>
        <div className='rounded-full p-4 py-2 border border-gray-700 flex items-center space-x-3'>
          <span className='text-2xl'><IoReturnUpBack /></span>
          <span>Raspunde</span>
        </div>
        <div className='rounded-full p-4 py-2 border border-gray-700 flex items-center space-x-3'>
          <span className='text-2xl'><IoReturnUpForwardOutline /></span>
          <span>Redirectioneaza</span>
        </div>
      </div>

      {/* <div className='mt-20'>
        <p><strong>To:</strong> {emailDetails.receiverEmail}</p>
        <p><strong>Archived: </strong>{emailDetails.archived ? 'Yes' : 'No'}</p>
        <p><strong>Checked: </strong>{emailDetails.checked ? 'Yes' : 'No'}</p>
        <p><strong>Deleted: </strong>{emailDetails.deleted ? 'Yes' : 'No'}</p>
        <p><strong>Read: </strong>{emailDetails.read ? 'Yes' : 'No'}</p>
        <p><strong>signedBy </strong>{emailDetails.signedBy}</p>
        <p><strong>Date:</strong> {new Date(emailDetails.timestamp).toLocaleString()}</p>
      </div> */}
    </div>
  );
}

export default Email;
