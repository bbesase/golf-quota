import React, { useEffect, useState } from 'react';
import { Golfer } from 'src/types/golfer';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Outlet } from 'react-router-dom';

export default function Dashboard() {
  const [golfer, setGolfer] = useState<Golfer | null>(null);

  useEffect(() => {
    const getGolferInfo = async () => {
    //   const querySnapshot = await getDocs(collection(getFirestore(), "tfd-golfers"));
    //   await querySnapshot.forEach((doc) => {
    //     console.log('doc', doc)
    //     const golfer: any = doc.data();
    //     // console.log('document', doc, foo)
    //     console.log('array', golfer)
    //     golfer.guuid = doc.id;
    //     golfers.push(golfer);
    // });

    // const querySnapshot = await getDocs(collection("tfd-golfers", ))
    };
    
  }, []);

  return (
    <div>
      <div>GOLFER DASHBOARD</div>
      <Outlet />
    </div>
  )
}