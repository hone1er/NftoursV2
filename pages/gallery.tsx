import {
  Box,
  Text,
  Image,
  useDisclosure,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { HeaderNav } from "../components/HeaderNav";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import { NFTCardBack, NFTCardFront } from "../components/NFTCard";
import { MOCK_NFT_DATA } from "../utils/mockData";
import { NFT } from "../utils/interfaces";
// nft interface

const Gallery = () => {
  const { isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNFTId, setSelectedNFTId] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isCardLoaded, setIsCardLoaded] = useState(false);
  // mock NFT data
  const [nfts, setNfts] = useState<NFT[]>(MOCK_NFT_DATA);

  useEffect(() => {
    if (!isOpen) {
      setIsFront(true);
    }
    return () => {};
  }, [isOpen]);

  return (
    <Box>
      <title>NFTours - Gallery</title>
      <HeaderNav />
      {isConnected ? (
        <Box width={"100%"} maxW={"1630px"} marginX={"auto"} p={4}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            width={"100%"}
            mt={12}
            p={2}
          >
            <Text fontSize={"4xl"} color={"gray.600"}>
              Gallery
            </Text>
          </Box>

          <Box
            width={"100%"}
            overflowX={"scroll"}
            display={"-webkit-box"}
            justifyContent="center"
            mt={16}
            scrollSnapType={"x proximity"}
            sx={{
              // custom scrollbar
              "&::-webkit-scrollbar": {
                width: "24px !important",
                height: "36px !important",
              },
              "&::-webkit-scrollbar-track": {
                "-webkit-box-shadow":
                  "inset 0px 0 8px rgba(0,0,0,0) !important",
                height: "36px !important",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "blue.800 !important",
                borderRadius: "lg",
                maxW: "14px !important",
              },
            }}
          >
            {nfts.map((nft) => (
              <Box
                key={nft.id}
                scrollSnapAlign={"start"}
                minWidth={"24vw"}
                borderWidth="1px"
                overflow="hidden"
                m={2}
                onClick={() => {
                  setSelectedNFTId(nft.id);
                  onOpen();
                }}
                cursor={"pointer"}
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDir={"column"}
                background="linear-gradient(45deg, rgba(135,206,250,.1) 0%, rgba(255,165,0,.1) 100%)"
                p={0}
              >
                <Skeleton width={"100%"} minW={"24vw"} isLoaded={imgLoaded}>
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    h={"auto"}
                    width={"24vw"}
                    minW={"280px"}
                    onLoad={() => {
                      setImgLoaded(true);
                    }}
                  />
                </Skeleton>

                <Box
                  bottom={"0"}
                  width={"100%"}
                  height={"100%"}
                  borderRadius={"lg"}
                  borderTopRadius={"0"}
                  m={0}
                  p={2}
                >
                  <Skeleton isLoaded={imgLoaded}>
                    <Text fontSize="xl" fontWeight="semibold">
                      {nft.name}{" "}
                    </Text>
                  </Skeleton>
                  <SkeletonCircle isLoaded={imgLoaded}>
                    <span color={"red !important"}>
                      {nft.isFavorite ? "♥" : "♡"}
                    </span>
                  </SkeletonCircle>

                  <Skeleton isLoaded={imgLoaded}>
                    <Text>Price: {nft.price} ETH</Text>
                  </Skeleton>
                </Box>
              </Box>
            ))}
          </Box>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay
              // transistion background color on open/close
              background={
                "linear-gradient(0deg, rgba(0,0,0,.24) 0%, rgba(255,255,255,.25) 100%)"
              }
            />
            {isFront ? (
              <NFTCardFront
                displayPurchaseDetails={true}
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

export default Gallery;
