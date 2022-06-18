import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMI15RD5FlA0IS6_4v2Zeq_fFtBTPMlhM",
  authDomain: "tfd-golf-quota.firebaseapp.com",
  databaseURL: "https://tfd-golf-quota-default-rtdb.firebaseio.com",
  projectId: "tfd-golf-quota",
  storageBucket: "tfd-golf-quota.appspot.com",
  messagingSenderId: "988180801478",
  appId: "1:988180801478:web:34f2256e2ab91d6ef674c7",
  measurementId: "G-X54V321YDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
