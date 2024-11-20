import React, { useState } from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank, MdKeyboardArrowDown, MdLabelImportant, MdLabelImportantOutline, MdStar, MdStarBorder } from "react-icons/md";
import emailsData from "../constants/emails";

import { Link } from 'react-router-dom';

function Inbox() {
  const [emails, setEmails] = useState(emailsData);

  const toggleChecked = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, isChecked: !email.isChecked } : email
      )
    );
  };

  const toggleStarred = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, isStarred: !email.isStarred } : email
      )
    );
  };

  const toggleImportant = (id) => {
    setEmails((prevEmails) =>
      prevEmails.map((email) =>
        email.id === id ? { ...email, isImportant: !email.isImportant } : email
      )
    );
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
            <Link to={'/email-details'} >
            <li
              key={email.id}
              className="flex justify-between border-b py-1 hover:shadow-lg hover:cursor-pointer hover:border-t"
            >
              <div className="flex">
                <div className="flex items-center">
                  <span
                    className="cursor-pointer"
                    onClick={() => toggleChecked(email.id)}
                  >
                    {email.isChecked ? (
                      <MdCheckBox className="text-xl text-gray-700" />
                    ) : (
                      <MdCheckBoxOutlineBlank className="text-xl text-gray-400" />
                    )}
                  </span>
                  <span
                    className="ml-3 cursor-pointer"
                    onClick={() => toggleStarred(email.id)}
                  >
                    {email.isStarred ? (
                      <MdStar className="text-xl text-yellow-500" />
                    ) : (
                      <MdStarBorder className="text-xl text-gray-400" />
                    )}
                  </span>
                  <span
                    className="ml-3 cursor-pointer"
                    onClick={() => toggleImportant(email.id)}
                  >
                    {email.isImportant ? (
                      <MdLabelImportant className="text-xl text-yellow-500" />
                    ) : (
                      <MdLabelImportantOutline className="text-xl text-gray-400" />
                    )}
                  </span>
                  <span className="ml-2 text-sm font-semibold w-48 truncate">
                    {email.sender}
                  </span>
                </div>
                <div className="ml-6 flex text-sm">
                  <div className="font-medium w-full truncate flex">
                    <span className="truncate max-w-96">{email.title}</span> - <span className=" max-w-96 truncate font-extralight">
                    {email.content}
                    </span>
                  </div>
                </div>
              </div>
              <div className="ml-6 text-sm text-gray-400">
                <span>{email.date}</span>
              </div>
            </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Inbox;
