import React, { useState, useEffect } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdKeyboardArrowDown, MdLabelImportant, MdLabelImportantOutline, MdStar, MdStarBorder } from "react-icons/md";
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from "../firebase/firebaseConfig";
import { Link } from 'react-router-dom';
import { toggleEmailField } from "../utils/emails/emailFunctions";

function Inbox({ filter }) {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const fetchEmails = () => {
      const db = getDatabase(app);
      const email = auth.currentUser?.email;

      if (!email) return;

      const formattedEmail = email.replace(/\./g, '_').replace('@', '-');
      const dbRef = ref(db, `emails/${formattedEmail}`);

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
                content: messageData.message,
                read: messageData.read,
                checked: messageData.checked,
                star: messageData.star,
                important: messageData.important,
                archived: messageData.archived,
                sentByMe: messageData.sentByMe,
                deleted: messageData.deleted
              });
            }
          });

          setEmails(messages);
          setFilteredEmails(messages); 
        } else {
          console.log(`Branch does not exist for: ${formattedEmail}`);
          setEmails([]);
          setFilteredEmails([]);
        }
      });
    };

    fetchEmails();
  }, [auth.currentUser?.email]); 

  useEffect(() => {
    let filtered = [...emails];

    if (filter === "received") {
      filtered = emails.filter(email => email.receiver === auth.currentUser?.email && email.sentByMe === false);
    } else if (filter === "starred") {
      filtered = emails.filter(email => email.star);
    } else if (filter === "sent") {
      filtered = emails.filter(email => email.sentByMe);
    } else if (filter === "important") {
      filtered = emails.filter(email => email.important);
    } else if (filter === "trash") {
      filtered = emails.filter(email => email.deleted);
    } else if (filter === "archived") {
      filtered = emails.filter(email => email.archived);
    } else if (filter === "all") {
      filtered = emails;
    }

    setFilteredEmails(filtered);
  }, [filter, emails]); 

  const formatEmailDate = (emailDate) => {
    const currentYear = new Date().getFullYear();
    const dateObj = new Date(emailDate);
    const emailYear = dateObj.getFullYear();

    if (emailYear === currentYear) {
      return dateObj.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      });
    } else {
      return dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-6 bg-gray-50 rounded-2xl">
      <div className="flex justify-between mb-2">
        <div className="flex items-center">
          <span className="cursor-pointer flex items-center">
            <MdCheckBoxOutlineBlank className="text-xl" />
            <MdKeyboardArrowDown />
          </span>
        </div>
        <div>
          <span>1-{filteredEmails.length} din {emails.length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul>
          {filteredEmails.map((email) => (
            <li
              key={email.id}
              className="flex items-center justify-between border-b py-1 hover:shadow-lg hover:cursor-pointer hover:border-t"
            >
              <div className="flex items-center">
                <div className="flex items-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => toggleEmailField(email.id, 'checked', email.checked, setEmails, emails)}
                  >
                    {email.checked ? (
                      <MdCheckBox className="text-xl text-gray-700" />
                    ) : (
                      <MdCheckBoxOutlineBlank className="text-xl text-gray-400" />
                    )}
                  </span>
                  <span
                    className="ml-3 cursor-pointer"
                    onClick={() => toggleEmailField(email.id, 'star', email.star, setEmails, emails)}
                  >
                    {email.star ? (
                      <MdStar className="text-xl text-yellow-500" />
                    ) : (
                      <MdStarBorder className="text-xl text-gray-400" />
                    )}
                  </span>
                  <span
                    className="ml-3 cursor-pointer"
                    onClick={() => toggleEmailField(email.id, 'important', email.important, setEmails, emails)}
                  >
                    {email.important ? (
                      <MdLabelImportant className="text-xl text-yellow-500" />
                    ) : (
                      <MdLabelImportantOutline className="text-xl text-gray-400" />
                    )}
                  </span>

                  <Link to={`/mail/${email.id}`}>
                    <span className="ml-2 text-sm font-semibold w-48 truncate">
                      {email.sender}
                    </span>
                  </Link>
                </div>
                <Link to={`/mail/${email.id}`}>
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
