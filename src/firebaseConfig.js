// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: "AIzaSyDHswHKu968AemC9opQ-Smw91pxyF7c5hw",
//   authDomain: "authentication-85e77.firebaseapp.com",
//   projectId: "authentication-85e77",
//   storageBucket: "authentication-85e77.appspot.com",
//   messagingSenderId: "1076840886392",
//   appId: "1:1076840886392:web:b974a2f508fe660c87fd8d"
// };

const firebaseConfig = {
  apiKey: "AIzaSyD5g3kEkNL_onQyx0whdIWefCZY4pri7ME",
  authDomain: "c2p-social.firebaseapp.com",
  projectId: "c2p-social",
  storageBucket: "c2p-social.appspot.com",
  messagingSenderId: "114254232655",
  appId: "1:114254232655:web:b97901d68a34dcd69c3e3a"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Set up Facebook provider
const facebookProvider = new FacebookAuthProvider();

export { auth, facebookProvider };
