import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { HeaderNav } from '../components/HeaderNav';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { NFTCardBack, NFTCardFront } from '../components/NFTCard';
import { MOCK_NFT_DATA } from '../utils/mockData';
import { NFTType } from '../utils/zodTypes';
import DiscoverCard from '../components/discover/card';
import dynamic from 'next/dynamic';

const Discover = () => {
  const { isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [center, setCenter] = useState<any>(null);
  const [selectedNFTId, setSelectedNFTId] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [isCardLoaded, setIsCardLoaded] = useState(false);
  // mock NFT data
  const [nfts, setNfts] = useState<NFTType[]>(MOCK_NFT_DATA);
  const MapComponent = dynamic(
    () => import('../components/Map'),
    { ssr: false } // This line is important. It's what prevents server-side render
  );

  useEffect(() => {
    if (!isOpen) {
      setIsFront(true);
    }
    return () => {};
  }, [isOpen]);

  return (
    <Box overflowX={'hidden'}>
      <title>NFTours - discover</title>
      <HeaderNav />
      {isConnected ? (
        <Box width={'100%'} maxW={'1260px'} marginX={'auto'}>
          <Box
            display='flex'
            flexWrap='wrap'
            justifyContent='flex-start'
            alignItems='center'
            width={'100%'}
            mt={12}
            p={4}
          >
            <Text fontSize={'4xl'} color={'gray.600'}>
              Discover
            </Text>
            <MapComponent
              nfts={nfts}
              center={center}
              setCenter={setCenter}
              setSelectedNFTId={(id: number) => {
                setSelectedNFTId(id);
                onOpen();
              }}
            />
          </Box>
          <Flex
            mx={4}
            flexDir={'column'}
            bg={'gray.300'}
            gap={4}
            p={4}
            maxH={'750px'}
            overflowY={'scroll'}
          >
            {nfts.map((nft: NFTType) => (
              <DiscoverCard
                key={nft.id}
                image={nft.image}
                location={nft.location}
                price={nft.price}
                handleClick={() => {
                  setCenter(nft.geoCode);
                  setSelectedNFTId(nft.id);
                  onOpen();
                }}
              />
            ))}
          </Flex>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay
              background={
                'linear-gradient(0deg, rgba(0,0,0,.24) 0%, rgba(255,255,255,.25) 100%)'
              }
            />
            {isFront ? (
              <NFTCardFront
                nft={nfts[selectedNFTId - 1]}
                handleFlip={() => {
                  setIsFront(false);
                }}
                isCardLoaded={isCardLoaded}
                onLoad={() => {
                  setIsCardLoaded(true);
                }}
                handleFavorite={() => {
                  setNfts(
                    nfts.map((nft) => {
                      if (nft.id === selectedNFTId) {
                        nft.isFavorite = !nft.isFavorite;
                      }
                      return nft;
                    })
                  );
                }}
              />
            ) : (
              <NFTCardBack
                nft={nfts[selectedNFTId - 1]}
                handleFlip={() => {
                  setIsFront(true);
                }}
              />
            )}
          </Modal>
        </Box>
      ) : (
        <Text fontSize={'xl'} color={'gray.600'}>
          Please connect your wallet to view your NFTs
        </Text>
      )}
    </Box>
  );
};

export default Discover;
