import React, { useEffect, useState } from 'react';
import { getFirestore, collection, query, onSnapshot, getDocs, getDoc, collectionGroup, doc } from 'firebase/firestore';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { Box, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import {Golfer} from 'src/types/golfer.ts';

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
  const [golferData, setGolferData] = useState(null);
  const [golfers, setGolfers] = useState(null);
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  // data = {
  //   nodes: data.nodes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
  // };

  const COLUMNS = [
    { label: 'Golfer', renderCell: (item) => `${item.firstName} ${item.lastName}` },
    { label: 'Quota 1', renderCell: (item) => item.quota1 },
    { label: 'Quota 2', renderCell: (item) => item.quota2 },
    { label: 'Quota 3', renderCell: (item) => item.quota3 },
    { label: 'Quota 4', renderCell: (item) => item.quota4 },
    { label: 'Quota 5', renderCell: (item) => item.quota5 },
    { label: 'Quota 6', renderCell: (item) => item.quota6 },
    { label: 'Average', renderCell: (item) => item.average },
  ];


  useEffect(() => {
    const testQuery = query(collection(getFirestore(), 'tfd-golfers'));
    console.log('test', testQuery);

    // THIS IS THE ONE
    const test = async () => {
      let golfers = [];
      const querySnapshot = await getDocs(collection(getFirestore(), "tfd-golfers"));
      console.log("snapshot", querySnapshot)
      await querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        const golfer = doc.data();
        // console.log('document', doc, foo)
        console.log('array', golfer)
        golfers.push(golfer);
      });
      setGolfers(golfers);
      console.log("golfers", golfers)
      
      let nodes = {golfers};
      console.log('table data', nodes)
      // for the search
      // tableData = {
      //   golfers: tableData.golfers.filter((item) => item.firstName.toLowerCase().includes(search.toLowerCase())),
      // };
      console.log('table data2', nodes)
      setGolferData(nodes);
      console.log('golf data', golferData)
      

      console.log('dataaaaa', data)
    };

    test();
  }, [])

  const formatDataForTable = () => {
    console.log('foramt', golfers)
    return {golfers}
  }

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

      {golferData && (

        <Box p={3} borderWidth="1px" borderRadius="lg">
          <CompactTable columns={COLUMNS} data={golferData} theme={theme} />
        </Box>
      )}

      <br />
    </div>
  )
}