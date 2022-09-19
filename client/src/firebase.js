import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc3-Ehvm5VwOqsCC1QMUYN7gcng42Ika4",
  authDomain: "shop-86fcd.firebaseapp.com",
  projectId: "shop-86fcd",
  storageBucket: "shop-86fcd.appspot.com",
  messagingSenderId: "1082131007809",
  appId: "1:1082131007809:web:454e037f4ed5900035f9c0"
};

const app = initializeApp(firebaseConfig);

export default app