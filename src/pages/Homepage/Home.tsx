import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { 
  Box, 
  Stack, 
  Input, 
  InputGroup, 
  InputLeftElement, 
  Button, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter,
  useDisclosure 
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import {Golfer} from 'src/types/golfer';
import Table from './Table';
import { app } from 'src';
import { orderBy } from 'lodash';


export default function Homepage() {
  const [golferData, setGolferData] = useState<Golfer[] | null>(null);
  const [filteredData, setFilteredData] = useState<Golfer[] | null>(null);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<String>("");
  const [lastName, setLastName] = useState<String>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const db = getFirestore(app);

  const handleSearch = (event: any) => {
    if (golferData)    {
      const filteredGolfers =  golferData?.filter((golfer) => `${golfer.firstName} ${golfer.lastName}`.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilteredData(filteredGolfers);
    }
  };

  const getGolfers = async () => {
    let golfers: Golfer[] = [];
    const querySnapshot = await getDocs(collection(getFirestore(), "tfd-golfers"));
    await querySnapshot.forEach((doc) => {
      const golfer: any = doc.data();
      golfer.guuid = doc.id;
      golfers.push(golfer);
    });

    golfers = orderBy(golfers, ['lastName', 'firstName'], ['asc', 'asc']);
    setGolferData(golfers);
    setFilteredData(golfers);
  };

  useEffect(() => {
    getGolfers();
    if (localStorage.getItem("adminUser")) { setIsUserAdmin(true) }
  }, []);

  const addGolfer = async () => {
    console.log('new golfer clicked', firstName, lastName);
    await addDoc(collection(db, "tfd-golfers"), {
      firstName: `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`,
      lastName: `${lastName.charAt(0).toUpperCase()}${lastName.slice(1)}`,
      quota1: 0,
      quota2: 0,
      quota3: 0,
      quota4: 0,
      quota5: 0,
      quota6: 0,
      quota7: 0,
      quota8: 0,
      quota9: 0,
      quota10: 0,
      average: 0,
    });
    getGolfers();
    onClose();
  }

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
            <Button width='15%' size='lg' colorScheme='teal' onClick={onOpen}>Add Golfer</Button>
          )}
        </InputGroup>
      </Stack>
      <br />
      {golferData && (
        <Table golfers={filteredData} />
      )}
      <br />

      <Modal initialFocusRef={initialRef} closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Golfer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Stack spacing={3}>
            <Input
              ref={initialRef}
              placeholder='First Name' 
              size='lg' 
              onChange={(e) => setFirstName(e.target.value)} 
            />
            <Input 
              placeholder='Last Name' 
              size='lg' 
              onChange={(e) => setLastName(e.target.value)}
            />
          </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr={4} onClick={addGolfer} size='lg' colorScheme='teal'>Add Golfer</Button>
            <Button onClick={onClose} size='lg'>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}