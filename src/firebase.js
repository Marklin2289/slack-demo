// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAAoTrtnwGNYuEHG_9TuRdPxhlrJg5CrNQ",
  authDomain: "slack-demo-a24b5.firebaseapp.com",
  projectId: "slack-demo-a24b5",
  storageBucket: "slack-demo-a24b5.appspot.com",
  messagingSenderId: "635387947942",
  appId: "1:635387947942:web:525aaec2c59215cb3cbd67",
  measurementId: "G-G2C9XS6MY5",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
