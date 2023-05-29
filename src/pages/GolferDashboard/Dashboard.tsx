import React, { useEffect, useState } from 'react';
import { Golfer } from 'src/types/golfer';
import { getFirestore, collection, getDocs, updateDoc, doc, } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { Button, Grid, GridItem, Heading, Input, Text, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper, 
  VStack,
  StackDivider,
  Box,
  Divider} from '@chakra-ui/react';
import { sortBy, sum } from 'lodash';
import { app } from 'src';
import SpinnerProgress from 'src/common/Spinner';

export default function Dashboard(props: any) {
  const [golfer, setGolfer] = useState<Golfer | null>(null);
  const [newQuota, setNewQuota] = useState<number>(0);
  const [isUserAdmin, setIsUserAdmin] = useState<boolean>(false);
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
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
          setHasLoaded(true);
        }
      });
    };
    
    getGolferInfo();
    if (localStorage.getItem("adminUser")) { setIsUserAdmin(true) }
  }, []);

  const calculateAverage = (golferScoreArray: Number[]) => {
    let denominator = 0;
    let zeroCount = 0;
    let validGolferScoreArray: Number[] = [];

    golferScoreArray.forEach((score) => {
      if (score === 0) {
        zeroCount = zeroCount + 1;
      } else {
        validGolferScoreArray.push(score);
      }
    });

    switch(zeroCount) {
      case 9:
        denominator = 1;
        break;
      case 8:
        denominator = 1;
        break;
      case 7:
        denominator = 1;
        break;
      case 6:
        denominator = 2;
        break;
      case 5:
        denominator = 2;
        break;
      case 4:
        denominator = 3;
        break;
      case 3:
        denominator = 3;
        break;
      case 2:
        denominator = 4;
        break;
      case 1:
        denominator = 4;
        break;
      case 0:
        denominator = 5;
        break;
    }
    validGolferScoreArray = sortBy(validGolferScoreArray).reverse().slice(0, denominator);
    const sumOfScores = sum(validGolferScoreArray);
    return Math.floor(sumOfScores / denominator);
  }

  const handleQuotaChange = async () => {
    if (golfer && newQuota) {
      const date = new Date();
      golfer.quota10 > 0 ? golfer.pastScores.unshift(`${date}^${golfer.quota6}`) : golfer.pastScores =  [];
      golfer.quota10 = golfer.quota9;
      golfer.quota9 = golfer.quota8;
      golfer.quota8 = golfer.quota7;
      golfer.quota7 = golfer.quota6;
      golfer.quota6 = golfer.quota5;
      golfer.quota5 = golfer.quota4;
      golfer.quota4 = golfer.quota3;
      golfer.quota3 = golfer.quota2;
      golfer.quota2 = golfer.quota1;
      golfer.quota1 = Number(newQuota);

      const golferScoreArray = [ 
        golfer.quota1,
        golfer.quota2,
        golfer.quota3,
        golfer.quota4,
        golfer.quota5,
        golfer.quota6,
        golfer.quota7,
        golfer.quota8,
        golfer.quota9,
        golfer.quota10,
      ];

      golfer.average = calculateAverage(golferScoreArray);
    }

    const docRef = doc(db, `tfd-golfers/${id}`);

    await updateDoc(docRef, {
      quota1: golfer?.quota1,
      quota2: golfer?.quota2,
      quota3: golfer?.quota3,
      quota4: golfer?.quota4,
      quota5: golfer?.quota5,
      quota6: golfer?.quota6,
      quota7: golfer?.quota7,
      quota8: golfer?.quota8,
      quota9: golfer?.quota9,
      quota10: golfer?.quota10,
      average: golfer?.average,
      pastScores: golfer?.pastScores,
    }).then((response: any)   =>  {
      setGolfer(golfer);
      setNewQuota(0);
    })
  }

  const convertDate = (score: string) => {
    const unformattedDate = score.split('^')[0];
    const formattedDate = new Date(unformattedDate).toLocaleString("en-US",  {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
    return formattedDate
  }

  const convertQuota = (score: string) => score.split('^')[1];

  return (
    <>
    {hasLoaded ? 
      <Grid 
        h='100%'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(6, 1fr)'
        gap={4}
        p={8}
      >
        <GridItem rowSpan={2} colSpan={1} p={24} bg='purple.100'>
          <Heading p={12}>{`${golfer?.firstName} ${golfer?.lastName}`}</Heading>
          <Heading p={12} mt={4}>Average Quota: {golfer?.average}</Heading>
          {isUserAdmin && (
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
        <GridItem colSpan={1} p={24} bg='purple.100'>
          <Text fontSize='lg'>Quota 1</Text>
          <Input 
            size='lg' 
            mt={1} 
            value={golfer?.quota1} 
            disabled={true} 
          />
          <Text fontSize='lg' mt={4}>Quota 6</Text>
          <Input 
            size='lg' 
            mt={1} 
            value={golfer?.quota6} 
            disabled={true} 
          />
        </GridItem>
        <GridItem colSpan={1} p={24} bg='purple.100'>
          <Text fontSize='lg'>Quota 2</Text>
          <Input 
            size='lg' 
            mt={1} 
            value={golfer?.quota2} 
            disabled={true} 
          />
          <Text fontSize='lg' mt={4}>Quota 7</Text>
          <Input 
            size='lg' 
            mt={1} 
            value={golfer?.quota7} 
            disabled={true} 
          />
        </GridItem>
        <GridItem colSpan={1} p={24} bg='purple.100'>
          <Text fontSize='lg'>Quota 3</Text>
          <Input 
            size='lg' 
            mt={1} 
            value={golfer?.quota3} 
            disabled={true} 
          />
          <Text fontSize='lg' mt={4}>Quota 8</Text>
          <Input 
            size='lg' 
            mt={1} 
            value={golfer?.quota8} 
            disabled={true} 
          />
        </GridItem>
        <GridItem colSpan={1} p={24} bg='purple.100'>
          <Text fontSize='lg'>Quota 4</Text>
          <Input 
            size='lg' 
            mt={1} 
            value={golfer?.quota4} 
            disabled={true} 
          />
          <Text fontSize='lg' mt={4}>Quota 9</Text>
          <Input 
            size='lg' 
            mt={1} 
            value={golfer?.quota9} 
            disabled={true} 
          />
        </GridItem>
        <GridItem colSpan={1} p={24} bg='purple.100'>
          <Text fontSize='lg'>Quota 5</Text>
          <Input 
            size='lg' 
            mt={1} 
            value={golfer?.quota5} 
            disabled={true} 
          />
          <Text fontSize='lg' mt={4}>Quota 10</Text>
          <Input 
            size='lg' 
            mt={1} 
            value={golfer?.quota10} 
            disabled={true} 
          />
        </GridItem>
        <GridItem colSpan={5} p={24} bg='purple.100'>
          <Text fontSize='3xl'>Past Quotas</Text>
          <Divider borderColor='gray.600' />
          {golfer?.pastScores && golfer?.pastScores.length > 0 ? 
            <Box h='40px'>
              <VStack
                divider={<StackDivider borderColor='gray.600' />}
                spacing={4}
                align='stretch'
                scrollBehavior='auto'
                mt={2}
              >
                {golfer.pastScores.map((score, i) => {
                  return (
                    <Box key={i} display='flex' flexDirection='row' justifyContent='space-between'>
                      <Text 
                        fontSize='lg'
                        width='50%'
                      >
                        Date: {convertDate(score)}
                      </Text>
                      <Text 
                        fontSize='lg'
                        width='50%'
                      >
                        Quota: {convertQuota(score)}
                      </Text>
                    </Box>
                  )
              })}
              </VStack>
            </Box> : <Text mt={4} fontSize='lg'>Golfer Has No Existing Quotas</Text>
          }
        </GridItem>
      </Grid> :
      <Box
        h='100%'
        display='flex'
        justifyContent='center'
        alignItems='center'
      >
        <SpinnerProgress />
      </Box>}
    </>
  )
}