import { useRouter } from 'next/router';
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from '@wagmi/core';

export default function Home() {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });

  const router = useRouter();

  return (
    <>
      <title>NFTours - Home page</title>
      <Box minH={'100vh'} bg={'gray.200'} p={0}>
        <VStack width={'100%'} justifyContent={'center'} pos={'relative'}>
          <Flex
            alignItems={'center'}
            height={'90vh'}
            width={'100vw'}
            background={'url(/postcards.jpeg)'}
            backgroundSize={'cover'}
            // blur background img
            filter={'blur(4px)'}
          ></Flex>
          <VStack
            pos={'absolute'}
            top={'30vh'}
            left={'5vw'}
            maxW={'90%'}
            background={'rgba(0,0,0,0.1)'}
            p={16}
            transition={'all 0.2s ease-in-out'}
            borderRadius={'10px'}
            // blur border
            backdropFilter={'blur(12px)'}
          >
            <Heading as='h1' fontSize='6xl' noOfLines={1} color={'gray.200'}>
              NFTours
            </Heading>

            <Heading
              minW={'200px'}
              fontSize={'sm'}
              pt={2}
              pb={8}
              color={'gray.400'}
            >
              collect your special moments and improve the world
            </Heading>

            <Button
              variant={'primary'}
              size={'lg'}
              onClick={() => {
                router.push('/gallery');
                connect();
              }}
              mb={12}
              transition={'all .5s ease-in-out'}
              fontSize={'xs'}
              boxShadow={
                isConnected ? '0px 0px 18px 14px rgba(225,225,225,0.6)' : 'none'
              }
            >
              Connect & launch
            </Button>
          </VStack>
          <VStack
            justifyContent={'space-between'}
            pt={16}
            width={'100%'}
            background={'gray.700'}
            color={'whiteAlpha.800'}
            height={'100%'}
          ></VStack>
        </VStack>
      </Box>
    </>
  );
}
