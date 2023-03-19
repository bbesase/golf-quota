import React, { useEffect } from 'react';
import { getFirestore, collection, query, onSnapshot, getDocs, getDoc, collectionGroup, doc } from 'firebase/firestore';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { DEFAULT_OPTIONS, getTheme } from '@table-library/react-table-library/chakra-ui';
import { Box, Stack, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

const key = 'Search';

const nodes = [
  {
    id: '0',
    name: 'Brent Besase',
    score1: 10,
    score2: 12,
    score3: 13,
    score4: 14,
    score5: 15,
    score6: 16,
    average: 15,
  },
];

export default function Homepage() {
  let data = {nodes};
  const chakraTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(chakraTheme);

  const [search, setSearch] = React.useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  data = {
    nodes: data.nodes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())),
  };

  const COLUMNS = [
    { label: 'Golfer', renderCell: (item) => item.name },
    { label: 'Quota 1', renderCell: (item) => item.score1 },
    { label: 'Quota 2', renderCell: (item) => item.score2 },
    { label: 'Quota 3', renderCell: (item) => item.score3 },
    { label: 'Quota 4', renderCell: (item) => item.score4 },
    { label: 'Quota 5', renderCell: (item) => item.score5 },
    { label: 'Quota 6', renderCell: (item) => item.score6 },
    { label: 'Average', renderCell: (item) => item.average },
  ];


  useEffect(() => {
    const testQuery = query(collection(getFirestore(), 'tfd-golfers'));
    console.log('test', testQuery);

    // THIS IS THE ONE
    const test = async () => {
      const querySnapshot = await getDocs(collection(getFirestore(), "tfd-golfers"));
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        const foo = doc.data();
        console.log('document', doc, foo)
      });
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

      <Box p={3} borderWidth="1px" borderRadius="lg">
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
      </Box>

      <br />
    </div>
  )
}