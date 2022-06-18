import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
// import firebase from 'firebase';
import { getFirestore, collection, query, onSnapshot, getDocs, getDoc, collectionGroup, doc } from 'firebase/firestore';

export default function App() {
  // const firebaseApp = firebase.getApps[0];
  // fetch('https://tfd-golf-quota-default-rtdb.firebaseio.com/')
  //   .then((success) => {
  //     console.log(success)
  //   });

  useEffect(() => {
    const testQuery = query(collection(getFirestore(), 'tfd-golfers'));
    console.log('test', testQuery);

    onSnapshot(testQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log('change type', change);
      })
    });

    const test = async () => {
      const querySnapshot = await getDocs(collection(getFirestore(), "tfd-golfers"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc}`);
      });
    };

    const test2 = async () => {
      const dataRef = await collection(getFirestore(), "tfd-golfers");
      const dataDoc = await collectionGroup(getFirestore(), 'tfd-golfers');
      const data = doc(getFirestore(), 'tfd-golfers', 'firstName');
      const dataSnap = await getDoc(data);

      console.log('snapppppppppppppp', dataSnap);
      console.log('datadoc', dataDoc);
      console.log('data ref', dataRef);
    }

    test();
    test2();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {/* {JSON.stringify(firebaseApp.options, null, 2)} */}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
