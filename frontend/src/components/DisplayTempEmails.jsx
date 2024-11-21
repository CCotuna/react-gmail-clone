import React, {useState} from 'react';
import app from '../firebase/firebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';

function DisplayTempEmails() {
  let [emails, setEmails] = useState([]);
   
  const fetchData = async () => {
    const db = getDatabase(app);
    const dbRef = ref(db, 'chat/test');
    const snapshot = await get(dbRef);
    if(snapshot.exists()){
        setEmails(Object.values(snapshot.val()));
    } else {
        alert("No data available")
    }
  }


  return (
    <div>
    <button onClick={fetchData}>Display temp emails</button>
    <ul>
        {emails.map((email, index) => (
            <li key={index}>
                <p>{email.user} : {email.message}</p>
            </li>
        ))}
    </ul>
    </div>
  );
};

export default DisplayTempEmails;