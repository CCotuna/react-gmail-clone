import React, { useState, useEffect } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdKeyboardArrowDown, MdLabelImportant, MdLabelImportantOutline, MdStar, MdStarBorder } from "react-icons/md";
import { getDatabase, ref, onValue, get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from "../firebase/firebaseConfig";
import { Link } from 'react-router-dom';

function Inbox() {
  const [emails, setEmails] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchEmails = async () => {
      const db = getDatabase(app);
      const email = auth.currentUser?.email;

      if (!email) return;

      const formattedEmail = email.replace(/\./g, '_').replace('@', '-');
      const dbRef = ref(db, `emails/${formattedEmail}`);
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        onValue(dbRef, (snapshot) => {
          if (snapshot.exists()) {
            const messages = [];
            snapshot.forEach((messageSnapshot) => {
              const messageData = messageSnapshot.val();

              if (messageData.receiverEmail === email || messageData.senderEmail === email) {
                messages.push({
                  id: messageSnapshot.key,
                  sender: messageData.senderEmail,
                  receiver: messageData.receiverEmail,
                  subject: messageData.subject,
                  message: messageData.message,
                  timestamp: new Date(messageData.timestamp).toLocaleString(),
                  content: messageData.message.substring(0, 50),  // Show first 50 characters of the message
                  read: messageData.read,
                  checked: messageData.checked,
                  star: messageData.star,
                  important: messageData.important,
                  archived: messageData.archived,
                  sentByMe: messageData.sentByMe
                });
              }
            });

            setEmails(messages);
          } else {
            setEmails([]);
          }
        });
      } else {
        console.log(`Branch does not exist for: ${formattedEmail}`);
        setEmails([]);
      }
    };

    fetchEmails();
  }, [auth.currentUser?.email]);

  // Format the date properly (you can customize this function further)
  const formatEmailDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const toggleChecked = (id) => {
    // Your toggle logic here
  };

  const toggleStarred = (id) => {
    // Your toggle logic here
  };

  const toggleImportant = (id) => {
    // Your toggle logic here
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6 bg-gray-50 rounded-2xl">
      {/* Header Section */}
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <span className="cursor-pointer flex items-center">
            <MdCheckBoxOutlineBlank className="text-xl" />
            <MdKeyboardArrowDown />
          </span>
        </div>
        <div>
          <span>1-{emails.length} din {emails.length}</span>
        </div>
      </div>

      {/* Emails List */}
      <div className="flex-1 overflow-y-auto">
        <ul>
          {emails.map((email) => (
            <li
              key={email.id}
              className="flex items-center justify-between border-b py-1 hover:shadow-lg hover:cursor-pointer hover:border-t"
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => toggleChecked(email.id)}
                  >
                    {email.checked ? (
                      <MdCheckBox className="text-xl text-gray-700" />
                    ) : (
                      <MdCheckBoxOutlineBlank className="text-xl text-gray-400" />
                    )}
                  </span>
                  <span
                    className="ml-3 cursor-pointer"
                    onClick={() => toggleStarred(email.id)}
                  >
                    {email.star ? (
                      <MdStar className="text-xl text-yellow-500" />
                    ) : (
                      <MdStarBorder className="text-xl text-gray-400" />
                    )}
                  </span>
                  <span
                    className="ml-3 cursor-pointer"
                    onClick={() => toggleImportant(email.id)}
                  >
                    {email.important ? (
                      <MdLabelImportant className="text-xl text-yellow-500" />
                    ) : (
                      <MdLabelImportantOutline className="text-xl text-gray-400" />
                    )}
                  </span>

                  <Link to={'/email-details'}>
                    <span className="ml-2 text-sm font-semibold w-48 truncate">
                      {email.sender}
                    </span>
                  </Link>
                </div>
                <Link to={'/email-details'}>
                  <div className="ml-6 flex text-sm">
                    <div className="font-medium w-full truncate flex">
                      <span className="truncate max-w-96">{email.subject}</span> - <span className="max-w-36 2xl:max-w-96 truncate font-extralight">
                        {email.content}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="ml-6 text-sm text-gray-400">
                <span>{formatEmailDate(email.timestamp)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Inbox;
