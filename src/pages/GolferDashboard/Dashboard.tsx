import React, { useEffect, useState } from 'react';
import { Golfer } from 'src/types/golfer';
import { getFirestore, collection, getDocs, updateDoc, doc, } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { Button, Grid, GridItem, Heading, Input, Text, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper } from '@chakra-ui/react';
import { app } from 'src';

export default function Dashboard(props: any) {
  const [golfer, setGolfer] = useState<Golfer | null>(null);
  const [newQuota, setNewQuota] = useState<number>(0)
  const { id } = useParams();
  const db = getFirestore(app);

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
  }, [golfer]);

  const handleQuotaChange = async () => {
    if (golfer && newQuota) {
      golfer.pastScores.unshift(golfer.quota6);
      golfer.quota6 = golfer.quota5;
      golfer.quota5 = golfer.quota4;
      golfer.quota4 = golfer.quota3;
      golfer.quota3 = golfer.quota2;
      golfer.quota2 = golfer.quota1;
      golfer.quota1 = Number(newQuota);
      golfer.average = Math.floor(( golfer.quota1 + golfer.quota2 + golfer.quota3 + golfer.quota4 + golfer.quota5 + golfer.quota6 ) / 6)
    }
    const docRef = doc(db, `tfd-golfers/${id}`);

    await updateDoc(docRef, {
      quota1: golfer?.quota1,
      quota2: golfer?.quota2,
      quota3: golfer?.quota3,
      quota4: golfer?.quota4,
      quota5: golfer?.quota5,
      quota6: golfer?.quota6,
      average: golfer?.average,
      pastScores: golfer?.pastScores,
    }).then((response: any)   =>  {
      console.log('response', response)
      setGolfer(golfer);
      setNewQuota(0);
    })
  }

  return (
    <Grid 
      h='100%'
      templateRows='repeat(2, 1fr)'
      templateColumns='repeat(4, 1fr)'
      gap={4}
      p={8}
    >
      <GridItem rowSpan={2} colSpan={1} p={24} bg='tomato'>
        <Heading p={12}>{`${golfer?.firstName} ${golfer?.lastName}`}</Heading>
        <Heading p={12} mt={4}>Average Quota: {golfer?.average}</Heading>
        {golfer?.auth && (
          <div>
            <Text fontSize='lg'>New Quota</Text>
            <NumberInput
              defaultValue={newQuota}
              value={newQuota}
              min={0} 
              max={100} 
              step={1} 
              mt={4} 
              onChange={value => setNewQuota(Number(value))}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button 
              colorScheme='teal'
              size='lg'
              onClick={handleQuotaChange}
              mt={4}
            >
              Submit Quota
            </Button>
          </div>
        )}
      </GridItem>
      <GridItem colSpan={1} p={24} bg='paleturquoise'>
        <Text fontSize='lg'>Quota 1</Text>
        <Input 
          size='lg' 
          mt={1} 
          value={golfer?.quota1 || ''} 
          disabled={true} 
        />
      </GridItem>
      <GridItem colSpan={1} p={24} bg='paleturquoise'>
        <Text fontSize='lg'>Quota 2</Text>
        <Input 
          size='lg' 
          mt={1} 
          value={golfer?.quota2 || ''} 
          disabled={true} 
        />
      </GridItem>
      <GridItem colSpan={1} p={24} bg='paleturquoise'>
        <Text fontSize='lg'>Quota 3</Text>
        <Input 
          size='lg' 
          mt={1} 
          value={golfer?.quota3 || ''} 
          disabled={true} 
        />
      </GridItem>
      <GridItem colSpan={1} p={24} bg='paleturquoise'>
        <Text fontSize='lg'>Quota 4</Text>
        <Input 
          size='lg' 
          mt={1} 
          value={golfer?.quota4 || ''} 
          disabled={true} 
        />
      </GridItem>
      <GridItem colSpan={1} p={24} bg='paleturquoise'>
        <Text fontSize='lg'>Quota 5</Text>
        <Input 
          size='lg' 
          mt={1} 
          value={golfer?.quota5 || ''} 
          disabled={true} 
        />
      </GridItem>
      <GridItem colSpan={1} p={24} bg='paleturquoise'>
        <Text fontSize='lg'>Quota 6</Text>
        <Input 
          size='lg' 
          mt={1} 
          value={golfer?.quota6 || ''} 
          disabled={true} 
        />
      </GridItem>
    </Grid>
  )
}