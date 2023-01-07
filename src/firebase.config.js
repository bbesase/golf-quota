const config = {
  apiKey: "AIzaSyAMI15RD5FlA0IS6_4v2Zeq_fFtBTPMlhM",
  authDomain: "tfd-golf-quota.firebaseapp.com",
  databaseURL: "https://tfd-golf-quota-default-rtdb.firebaseio.com",
  projectId: "tfd-golf-quota",
  storageBucket: "tfd-golf-quota.appspot.com",
  messagingSenderId: "988180801478",
  appId: "1:988180801478:web:34f2256e2ab91d6ef674c7",
  measurementId: "G-X54V321YDY"
}

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided.' + '\n' +
    'Add your web app\'s configuration object to firebase-config.js');
  } else {
    return config;
  }
}