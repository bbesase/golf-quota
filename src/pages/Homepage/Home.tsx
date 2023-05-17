import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Box, Stack, Input, InputGroup, InputLeftElement, Button } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import {Golfer} from 'src/types/golfer';
import Table from './Table';

export default function Homepage() {
  const [golferData, setGolferData] = useState<Golfer[] | null>(null);
  const [filteredData, setFilteredData] = useState<Golfer[] | null>(null);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);

  const handleSearch = (event: any) => {
    console.log('event', event, golferData)

    if (golferData)    {
      const filteredGolfers =  golferData?.filter((golfer) => `${golfer.firstName} ${golfer.lastName}`.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilteredData(filteredGolfers);
    }
  };

  useEffect(() => {
    const getGolfers = async () => {
      let golfers: Golfer[] = [];
      const querySnapshot = await getDocs(collection(getFirestore(), "tfd-golfers"));
      await querySnapshot.forEach((doc) => {
        const golfer: any = doc.data();
        golfer.guuid = doc.id;
        golfers.push(golfer);
      });

      setGolferData(golfers);
      setFilteredData(golfers);

      if (localStorage.getItem("adminUser")) { setIsUserAdmin(true) }
    };

    getGolfers();
  }, [])

  return (
    <Box display='flex' width='100%' p={16} flexDirection='column'>
      <Stack spacing={10}>
        <InputGroup
          display='flex'
          justifyContent='space-between'
        >
          <InputLeftElement
            pointerEvents="none"
            children={<FaSearch style={{ color: '#4a5568' }} />}
          />
          <Input width='50%' placeholder="Search Golfer" onChange={handleSearch} />
          {isUserAdmin && (
            <Button width='15%' size='lg' colorScheme='teal'>Add Golfer</Button>
          )}
        </InputGroup>
      </Stack>
      <br />
      {golferData && (
        <Table golfers={filteredData} />
      )}
      <br />
    </Box>
  )
}