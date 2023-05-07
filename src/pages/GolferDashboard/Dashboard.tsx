import React, { useEffect, useState } from 'react';
import { Golfer } from 'src/types/golfer';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { Grid, GridItem, Heading, Input, Text } from '@chakra-ui/react';

export default function Dashboard(props: any) {
  const [golfer, setGolfer] = useState<Golfer | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const getGolferInfo = async () => {
      const querySnapshot = await getDocs(collection(getFirestore(), "tfd-golfers"));
      await querySnapshot.forEach((doc) => {
        const golfer: any = doc.data();
        golfer.guuid = doc.id;
        if (doc.id === id) {
          golfer.guuid = doc.id;
          setGolfer(golfer);
        }
      });
    };
    
    getGolferInfo();
  }, []);

  const handleQuotaChange = (label: string) => {

  }

  return (
    <Grid 
      h='100%'
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(4, 1fr)'
      gap={4}
      p={8}
    >
      <GridItem rowSpan={2} colSpan={1} bg='tomato'>
        <Heading p={12}>{`${golfer?.firstName} ${golfer?.lastName}`}</Heading>
        <Heading p={12} mt={4}>Average Quota: {golfer?.average}</Heading>
      </GridItem>
      <GridItem colSpan={1} p={24} bg='paleturquoise'>
        <Text fontSize='lg'>Quota 1</Text>
        <Input size='lg' mt={1} value={golfer?.quota1} disabled={golfer?.auth === false} onChange={() => handleQuotaChange('quota1')}/>
      </GridItem>
      <GridItem colSpan={1} pl='2' bg='paleturquoise' />
      <GridItem colSpan={1} pl='2' bg='paleturquoise' />
      <GridItem colSpan={1} pl='2' bg='paleturquoise' />
      <GridItem colSpan={1} pl='2' bg='paleturquoise' />
      <GridItem colSpan={1} pl='2' bg='paleturquoise' />
    </Grid>
  )
}