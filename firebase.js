import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyA7X7APZMP9-LMhZS2a9Nn3xCBj3ySlmzg",
  authDomain: "pawanmishracsc-be68c.firebaseapp.com",
  projectId: "pawanmishracsc-be68c",
  storageBucket: "pawanmishracsc-be68c.firebasestorage.app",
  messagingSenderId: "454830827202",
  appId: "1:454830827202:web:d5ec70f09b76f4b8f27d5b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };