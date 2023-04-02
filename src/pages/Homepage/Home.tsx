import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, onSnapshot, getDocs, getDoc, collectionGroup, doc } from 'firebase/firestore';
import { Box, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import {Golfer} from 'src/types/golfer';
import Table from './Table';

const key = 'Search';

const nodes = [
  {
    id: '0',
    name: 'Brent Besase',
    quota1: 10,
    quota2: 12,
    quota3: 13,
    quota4: 14,
    quota5: 15,
    quota6: 16,
    average: 15,
  },
];

export default function Homepage() {
  let data = {nodes};
  const [golferData, setGolferData] = useState<Golfer[] | null>(null);
  // const [golfers, setGolfers] = useState<Golfer[] | null>(null);

  const [search, setSearch] = React.useState('');

  const handleSearch = (event: any) => {
    setSearch(event.target.value);
  };

  // data = {
  //   nodes: data.nodes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
  // };

  useEffect(() => {
    const testQuery = query(collection(getFirestore(), 'tfd-golfers'));
    console.log('test', testQuery);

    // THIS IS THE ONE
    const test = async () => {
      let golfers: Golfer[] = [];
      const querySnapshot = await getDocs(collection(getFirestore(), "tfd-golfers"));
      console.log("snapshot", querySnapshot)
      await querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        const golfer: any = doc.data();
        // console.log('document', doc, foo)
        console.log('array', golfer)
        golfers.push(golfer);
      });
      // setGolfers(golfers);
      // console.log("golfers", golfers)
      
      // let nodes: any = {golfers};
      // console.log('table data', nodes)
      // for the search
      // tableData = {
      //   golfers: tableData.golfers.filter((item) => item.firstName.toLowerCase().includes(search.toLowerCase())),
      // };
      // console.log('table data2', nodes)
      setGolferData(golfers);
      // console.log('golf data', golferData)
      // console.log('dataaaaa', data)
    };

    test();
  }, [])

  return (
    // <div>Homepage</div>
    <div className='flex w-full p-8'>
      <Stack spacing={10}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaSearch style={{ color: '#4a5568' }} />}
          />
          <Input placeholder="Search Task" value={search} onChange={handleSearch} />
        </InputGroup>
      </Stack>
      <br />

      {/* {golferData && (

        <Box p={3} borderWidth="1px" borderRadius="lg">
          <CompactTable columns={COLUMNS} data={golferData} theme={theme} />
        </Box>
      )} */}
      {golferData && (
        <Table golfers={golferData} />
      )}
      <br />
    </div>
  )
}