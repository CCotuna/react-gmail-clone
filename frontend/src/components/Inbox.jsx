import React, { useState, useEffect } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdKeyboardArrowDown, MdLabelImportant, MdLabelImportantOutline, MdStar, MdStarBorder } from "react-icons/md";

import { RiInboxArchiveLine } from "react-icons/ri";
import { LiaTrashAlt } from "react-icons/lia";

import { MdOutlineMarkEmailUnread } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";


import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from "../firebase/firebaseConfig";
import { Link, useLocation } from 'react-router-dom';
import { toggleEmailField, permanentlyDeleteEmail } from "../utils/emails/emailFunctions";

function Inbox({ filter, isSettingsOpen }) {
  const [emails, setEmails] = useState([]);
  const [filteredEmails, setFilteredEmails] = useState([]);
  const [hoveredEmail, setHoveredEmail] = useState(null);
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
    let filtered = emails.filter(email => {
      if (filter !== "trash" && email.deleted) return false;
      if (filter !== "archived" && email.archived) return false;

      if (filter === "received") {
        return email.receiver === auth.currentUser?.email && email.sentByMe === false;
      } else if (filter === "starred") {
        return email.star;
      } else if (filter === "sent") {
        return email.sentByMe;
      } else if (filter === "important") {
        return email.important;
      } else if (filter === "trash") {
        return email.deleted;
      } else if (filter === "archived") {
        return email.archived;
      } else if (filter === "all" || filter === "snoozed" || filter === "drafts" || filter === "scheduled" || filter === "spam") {
        return true;
      }

      return false;
    });

    setFilteredEmails(filtered);
  }, [filter, emails, auth.currentUser?.email]);

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
          <span>{filteredEmails.length} - {filteredEmails.length} din {filteredEmails.length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <ul>
          {filteredEmails.map((email) => (
            <li
              key={email.id}
              className="flex items-center justify-between border-b py-1 hover:shadow-lg hover:cursor-pointer hover:py-0 hover:border-t"
              onMouseEnter={() => setHoveredEmail(email.id)}
              onMouseLeave={() => setHoveredEmail(null)}
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
                </div>
                <Link to={`/gmail/mail/${email.id}`} className="flex">
                  <span className="ml-2 text-sm font-semibold w-48 truncate">
                    {email.sender}
                  </span>
                  <div className='ml-6 flex text-sm'>
                    <div className={`font-medium w-full truncate flex ${isSettingsOpen ? 'gap-1' : 'gap-2'}`}>
                      <span className={`truncate ${isSettingsOpen ? 'max-w-48 2xl:max-w-72' : 'max-w-48'}`}>
                        {email.subject}
                      </span>
                      -
                      <span className={`truncate font-extralight ${isSettingsOpen ? 'max-w-48 2xl:max-w-48' : 'max-w-36 2xl:max-w-96'}`}>
                        {email.content}
                      </span>
                    </div>
                  </div>

                </Link>
              </div>
              <div className=" ml-6 text-sm text-black">
                {!hoveredEmail && (
                  <span>{formatEmailDate(email.timestamp)}</span>
                )}
                {hoveredEmail === email.id && (
                  <div className="flex gap-2">
                    <span
                      className="cursor-pointer p-1 rounded-full hover:bg-gray-200 hover:text-gray-500 text-xl"
                      onClick={() => toggleEmailField(email.id, 'archived', email.archived, setEmails, emails)}
                    >
                      <RiInboxArchiveLine />
                    </span>
                    <span
                      className="cursor-pointer p-1 rounded-full hover:bg-gray-200 hover:text-gray-500 text-xl"
                      onClick={() => {
                        if (filter === "trash") {
                          permanentlyDeleteEmail(email.id, setEmails, emails);
                        } else {
                          toggleEmailField(email.id, 'deleted', email.deleted, setEmails, emails);
                        }
                      }}
                    >
                      <LiaTrashAlt />
                    </span>
                    <span
                      className="cursor-pointer p-1 rounded-full hover:bg-gray-200 hover:text-gray-500 text-xl"
                      onClick={() => toggleEmailField(email.id, 'read', email.read, setEmails, emails)}
                    >
                      <HiOutlineMailOpen />
                      {/* <MdOutlineMarkEmailUnread /> */}
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Inbox;
