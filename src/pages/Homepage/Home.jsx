import React, { useEffect } from 'react';
import { getFirestore, collection, query, onSnapshot, getDocs, getDoc, collectionGroup, doc } from 'firebase/firestore';

export default function Homepage() {
  useEffect(() => {
    const testQuery = query(collection(getFirestore(), 'tfd-golfers'));
    console.log('test', testQuery);

    onSnapshot(testQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log('change type', change);
      })
    });

    // THIS IS THE ONE
    const test = async () => {
      const querySnapshot = await getDocs(collection(getFirestore(), "tfd-golfers"));
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        const foo = doc.data();
        console.log('document', doc, foo)
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
    <div>Homepage</div>
  )
}