import React, {useState} from 'react';
import app from '../firebase/firebaseConfig';
import { getDatabase, ref, set, push } from 'firebase/database';

function Chat() {
  let [inputValue1, setInputValue1] = useState('');
  let [inputValue2, setInputValue2] = useState('');

  const saveData = async () => {
    const db = getDatabase(app);
    const newDoc = push(ref(db, 'chat/test'));
    await set(newDoc, {
      message: inputValue1,
      user: inputValue2,
    }).then(() => {
      alert('Data saved successfully');
    }).catch((error) => {
      alert('Data could not be saved' + error)});
  }
  return (
    <div>
    Write
    <input
      type="text"
      value={inputValue1}
      onChange={(e) => setInputValue1(e.target.value)}
    />
    <br />
    <input
      type="text"
      value={inputValue2}
      onChange={(e) => setInputValue2(e.target.value)}
    />
  <button onClick={saveData}>Save data</button>
    </div>
  );
};

export default Chat;  