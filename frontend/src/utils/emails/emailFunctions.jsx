import { getDatabase, ref, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../../firebase/firebaseConfig';

export const toggleEmailField = async (id, field, currentState, setEmails, emails) => {
  const updatedEmails = emails.map((email) =>
    email.id === id ? { ...email, [field]: !currentState } : email
  );
  setEmails(updatedEmails);

  const db = getDatabase(app);
  const auth = getAuth();
  const email = auth.currentUser?.email;
  const formattedEmail = email.replace(/\./g, '_').replace('@', '-');
  const emailRef = ref(db, `emails/${formattedEmail}/${id}`);

  update(emailRef, { [field]: !currentState });
};
