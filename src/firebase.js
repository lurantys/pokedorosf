// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBM2FZ2l9RTyK3AheX8oZk0k0OvBtQbMQs",
  authDomain: "pokedoro-bc684.firebaseapp.com",
  projectId: "pokedoro-bc684",
  storageBucket: "pokedoro-bc684.firebasestorage.app",
  messagingSenderId: "489470083733",
  appId: "1:489470083733:web:e600cc5a5947fbfb43119c",
  measurementId: "G-MR93DZ99BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Set persistence to LOCAL
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Firebase persistence set to LOCAL');
  })
  .catch((error) => {
    console.error("Error setting auth persistence:", error);
  });

// Function to sync user data with Firestore
const syncUserData = async (userId, data) => {
  try {
    const userRef = doc(db, 'users', userId);
    // Ensure we're not overwriting other users' data
    await setDoc(userRef, {
      ...data,
      userId, // Add userId to the document for extra security
      lastUpdated: new Date().toISOString()
    }, { merge: true });
    console.log('User data synced successfully for user:', userId);
  } catch (error) {
    console.error('Error syncing user data:', error);
  }
};

// Function to get user data from Firestore
const getUserData = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const data = userSnap.data();
      // Verify the data belongs to the correct user
      if (data.userId === userId) {
        return data;
      }
      console.error('Data mismatch: document userId does not match requested userId');
      return null;
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

// Function to update specific user data fields
const updateUserData = async (userId, data) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, data);
    console.log('User data updated successfully');
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};

export { auth, db, firebaseConfig, syncUserData, getUserData, updateUserData };
