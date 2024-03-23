import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore' // database (firestore - NoSQL)
import {getAuth} from 'firebase/auth'

// my informations
const firebaseConfig = {
    apiKey: "AIzaSyBhzfjgqPsB8inDEurxuNjljqi-if1-t9I",
    authDomain: "test-8c67d.firebaseapp.com",
    projectId: "test-8c67d",
    storageBucket: "test-8c67d.appspot.com",
    messagingSenderId: "655113243432",
    appId: "1:655113243432:web:bff8d7f8e5c8a7476dde1d",
    measurementId: "G-4Z67GRSXM2"
  };

const firebaseApp = initializeApp(firebaseConfig) // initializing of the firebase (initializeApp get´s the object with configs)

const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

export {db, auth}