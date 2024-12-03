import { getDatabase, ref, set, get, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import app from '../../firebase/firebaseConfig';

export const saveBackground = async (path) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error('User not authenticated.');
            return;
        }

        const formattedEmail = user.email.replace(/\./g, '_').replace('@', '-');
        const db = getDatabase(app);
        const backgroundRef = ref(db, `users/${formattedEmail}/background`);

        await set(backgroundRef, path);
        console.log('Background saved successfully:', path);
    } catch (error) {
        console.error('Error saving background:', error);
    }
};

export const loadBackground = async (setWallpaper, defaultBackground) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            console.error('User not authenticated.');
            return;
        }

        const formattedEmail = user.email.replace(/\./g, '_').replace('@', '-');
        const db = getDatabase(app);
        const backgroundRef = ref(db, `users/${formattedEmail}/background`);

        onValue(backgroundRef, (snapshot) => {
            if (snapshot.exists()) {
              setWallpaper(snapshot.val()); 
            } else {
              setWallpaper(defaultBackground);
            }
          });
    } catch (error) {
        console.error('Error loading background:', error);
        setWallpaper(defaultBackground);
    }
};