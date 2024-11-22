import { getDatabase, ref, update, remove } from 'firebase/database';
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

export const permanentlyDeleteEmail = async (id, setEmails, emails) => {
  try {
    const updatedEmails = emails.filter((email) => email.id !== id);
    setEmails(updatedEmails);

    const db = getDatabase(app);
    const auth = getAuth();
    const email = auth.currentUser?.email;

    if (!email) {
      throw new Error('User not authenticated.');
    }

    const formattedEmail = email.replace(/\./g, '_').replace('@', '-');
    const emailRef = ref(db, `emails/${formattedEmail}/${id}`);

    await remove(emailRef);

    console.log(`Email with ID: ${id} has been permanently deleted.`);
  } catch (error) {
    console.error('Error deleting email:', error);
  }
};