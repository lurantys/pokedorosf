// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBM2FZ2l9RTyK3AheX8oZk0k0OvBtQbMQs",
  authDomain: "pokedoro-bc684.firebaseapp.com",
  projectId: "pokedoro-bc684",
  storageBucket: "pokedoro-bc684.firebasestorage.app",
  messagingSenderId: "489470083733",
  appId: "1:489470083733:web:e600cc5a5947fbfb43119c",
  measurementId: "G-MR93DZ99BZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
