import {
  Box,
  Text,
  Image,
  useDisclosure,
  Skeleton,
  SkeletonCircle,
  WrapItem,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { HeaderNav } from "../components/HeaderNav";
import { Modal, ModalOverlay } from "@chakra-ui/react";
import { NFTCardBack, NFTCardFront } from "../components/NFTCard";
import { NFTschema, NFTType } from "../utils/zodTypes";
import useNfts from "../hooks/useNfts";
import useIsFavorite from "../hooks/useIsFavorite";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/card";

const Gallery = () => {
  const { isConnected } = useAccount();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedNFTId, setSelectedNFTId] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [isCardLoaded, setIsCardLoaded] = useState(false);
  // mock NFT data
  const { nfts, isError, isLoading, mutate } = useNfts();
  const { handleFavorite } = useIsFavorite();
  const toast = useToast();
  if (isLoading) {
    return (
      <Box>
        <Text>...is loading</Text>
      </Box>
    );
  }
  if (isError) {
    return (
      <Box>
        <Text>...is error</Text>
      </Box>
    );
  }

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
            mt={16}
            p={2}
            overflowX={"scroll"}
            display="grid"
            gridGap={8}
            gridTemplateColumns={"repeat(auto-fit,minmax(400px, 1fr))"}
            justifyContent={"center"}
            margin={"auto"}
          >
            {nfts &&
              nfts?.map((nft: NFTType, idx: number) => {
                const isSafe = NFTschema.safeParse(nft);
                if (!isSafe.success) {
                  console.log(
                    "🚀 ~ file: gallery.tsx:100 ~ nfts?.map ~ NFTschema.safeParse(nft)",
                    isSafe.error
                  );
                  return null;
                }
                if (isSafe.success) {
                  return (
                    <WrapItem key={idx}>
                      <Card
                        maxW="xs"
                        width={"100%"}
                        margin={"auto"}
                        color={"black"}
                        background={"whiteAlpha.100"}
                        borderRadius={"lg"}
                        boxShadow={"lg"}
                      >
                        <CardBody
                          bg={"gray.50"}
                          borderRadius={"lg"}
                          borderBottomRadius={"0"}
                          onClick={() => {
                            setSelectedNFTId(idx);
                            onOpen();
                          }}
                        >
                          <CardHeader
                            boxShadow={"xl"}
                            px={8}
                            pb={8}
                            borderRadius={"lg"}
                            transition={"all 2s ease-in-out"}
                            // colorful background gradient
                            backgroundImage={
                              "linear-gradient(to left, #fbb8ac, #e6a9e2)"
                            }
                          >
                            <Heading noOfLines={1} size="md" p={2} h={"44.5px"}>
                              {nft?.name}
                            </Heading>
                            <Skeleton
                              width={"100%"}
                              borderRadius={"lg"}
                              isLoaded={imgLoaded}
                            >
                              <Image
                                borderRadius={"lg"}
                                src={nft.image}
                                alt={nft.name}
                                onLoad={() => {
                                  setImgLoaded(true);
                                }}
                                onError={() => {
                                  setImgLoaded(true);
                                }}
                              />
                            </Skeleton>
                          </CardHeader>
                          <Stack mt="6" spacing="3" p={4}>
                            <Skeleton
                              height={imgLoaded ? "unset" : "20px"}
                              isLoaded={imgLoaded}
                              w={
                                imgLoaded
                                  ? "unset"
                                  : Math.max(120, Math.random() * 300) + "px"
                              }
                            ></Skeleton>
                            <Skeleton noOfLines={3} isLoaded={imgLoaded}>
                              <Text noOfLines={3} minH={"92px"}>
                                {nft.description}
                              </Text>

                              <Text color="blue.600" fontSize="2xl">
                                {nft.price} ETH
                              </Text>
                            </Skeleton>
                          </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter p={4}>
                          <ButtonGroup spacing="2" mr={8}>
                            <Button variant="solid" colorScheme="blue">
                              Buy now
                            </Button>
                          </ButtonGroup>
                          <SkeletonCircle isLoaded={imgLoaded}>
                            <IconButton
                              variant={"unstyled"}
                              width={"auto"}
                              aria-label="favorite"
                              onClick={async () => {
                                const res = await handleFavorite(
                                  nfts &&
                                    nfts.find((n: NFTType) => n.id === nft.id)
                                );
                                if (res?.status === 200) {
                                  mutate();
                                } else {
                                  toast({
                                    title: "Error",
                                    description:
                                      "there was an error on our end. please try again later.",
                                    status: "error",
                                    duration: 4000,
                                    isClosable: true,
                                  });
                                }
                              }}
                            >
                              <span color={"red !important"}>
                                {nft.isFavorite ? "♥" : "♡"}
                              </span>
                            </IconButton>
                          </SkeletonCircle>
                        </CardFooter>
                      </Card>
                    </WrapItem>
                  );
                }
              })}
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
                nft={nfts && nfts[selectedNFTId]}
                handleFlip={() => {
                  setIsFront(false);
                }}
                isFront={isFront}
                isCardLoaded={isCardLoaded}
                onLoad={() => {
                  setIsCardLoaded(true);
                }}
                handleFavorite={async () => {
                  const res = await handleFavorite(
                    nfts &&
                      nfts.find((n: NFTType) => n.id === nfts[selectedNFTId].id)
                  );
                  if (res?.status === 200) {
                    mutate();
                  } else {
                    toast({
                      title: "Error",
                      description:
                        "there was an error on our end. please try again later.",
                      status: "error",
                      duration: 4000,
                      isClosable: true,
                    });
                  }
                }}
              />
            ) : (
              <NFTCardBack
                nft={nfts && nfts[selectedNFTId]}
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
