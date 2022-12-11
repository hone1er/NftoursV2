import { Box, Text, useDisclosure } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { HeaderNav } from "../components/HeaderNav";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import { NFTCardBack, NFTCardFront } from "../components/NFTCard";
import { MOCK_NFT_DATA } from "../utils/mockData";
import Places from "../components/Map";
import { NFTType } from "../utils/zodTypes";

const Discover = () => {
  const { isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNFTId, setSelectedNFTId] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isCardLoaded, setIsCardLoaded] = useState(false);
  // mock NFT data
  const [nfts, setNfts] = useState<NFTType[]>(MOCK_NFT_DATA);

  useEffect(() => {
    if (!isOpen) {
      setIsFront(true);
    }
    return () => {};
  }, [isOpen]);

  return (
    <Box>
      <title>NFTours - discover</title>
      <HeaderNav />
      {isConnected ? (
        <Box width={"100%"} maxW={"1260px"} marginX={"auto"}>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
            alignItems="center"
            width={"100%"}
            mt={12}
            p={4}
          >
            <Text fontSize={"4xl"} color={"gray.600"}>
              Discover
            </Text>
            <Places
              setSelectedNFTId={(id) => {
                setSelectedNFTId(id);
                onOpen();
              }}
            />
          </Box>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay
              background={
                "linear-gradient(0deg, rgba(0,0,0,.24) 0%, rgba(255,255,255,.25) 100%)"
              }
            />
            {isFront ? (
              <NFTCardFront
                nft={nfts[selectedNFTId - 1]}
                handleFlip={() => {
                  setIsFront(false);
                }}
                isFront={isFront}
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
        <Text fontSize={"xl"} color={"gray.600"}>
          Please connect your wallet to view your NFTs
        </Text>
      )}
    </Box>
  );
};

export default Discover;
