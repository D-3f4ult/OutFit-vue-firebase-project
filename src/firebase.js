// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage'; // إضافة Storage

// إعدادات Firebase الخاصة بك (من Firebase Console)
const firebaseConfig = {
    apiKey: "AIzaSyC0HhqcK01_PTullXpsK0PZgLKKuZwh0dQ",
    authDomain: "outfit-670fc.firebaseapp.com",
    projectId: "outfit-670fc",
    storageBucket: "outfit-670fc.appspot.com", // تأكد من أن هذا الاسم صحيح
    messagingSenderId: "560797143915",
    appId: "1:560797143915:web:b62bd43b68d439a499f22e",
    measurementId: "G-5TNQP4LQSF"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);

// إعداد Firestore و Authentication و Storage
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // إضافة تهيئة Storage

export { db, auth, storage };
