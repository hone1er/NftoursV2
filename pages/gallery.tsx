import {
  Box,
  Text,
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
  Flex,
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";
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
    <Box overflowX={"hidden"}>
      <title>NFTours - Gallery</title>
      <HeaderNav />

      {isConnected ? (
        <Box
          width={"100%"}
          maxW={"1630px"}
          marginX={"auto"}
          p={4}
          bg={"gray.50"}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width={"100%"}
            mt={12}
            p={2}
            mb={8}
          >
            <Text
              fontSize={"6xl"}
              color={"gray.900"}
              fontWeight={"bold"}
              textUnderlineOffset={".3em"}
              textDecorationLine={"underline"}
            >
              Gallery
            </Text>
          </Box>
          <Box
            width={"100%"}
            mt={16}
            p={2}
            overflowX={"scroll"}
            display="grid"
            gridGap={4}
            gridTemplateColumns={"repeat(auto-fit,minmax(400px, 1fr))"}
            justifyContent={"center"}
            margin={"auto"}
          >
            {nfts &&
              nfts?.map((nft: NFTType, idx: number) => {
                const isSafe = NFTschema.safeParse(nft);
                if (!isSafe.success) {
                  return null;
                }
                if (isSafe.success) {
                  return (
                    <WrapItem key={idx} border={"4px solid black"}>
                      <Card
                        width={"100%"}
                        margin={"auto"}
                        color={"black"}
                        bg={"gray.50"}
                        borderRadius={"lg"}
                        boxShadow={"lg"}
                      >
                        <CardBody
                          borderRadius={"lg"}
                          px={4}
                          borderBottomRadius={"0"}
                          cursor={"pointer"}
                          onClick={() => {
                            setSelectedNFTId(idx);
                            onOpen();
                          }}
                          background={"gray.200"}
                        >
                          <CardHeader transition={"all 2s ease-in-out"}>
                            <Heading
                              display={"flex !important"}
                              alignItems={"center !important"}
                              noOfLines={1}
                              size="md"
                              p={1}
                              lineHeight="32px"
                              px={2}
                              boxShadow={"lg"}
                              mt={2}
                              mb={2}
                              h={"44.5px"}
                              border={"inset"}
                            >
                              {nft?.name}
                            </Heading>
                            <Skeleton
                              width={"100%"}
                              borderRadius={"lg"}
                              isLoaded={imgLoaded}
                              height={imgLoaded ? "unset" : "200px"}
                            >
                              <Flex border={"4px solid black"} p={0} m={0}>
                                <Image
                                  src={nft?.image || ""}
                                  alt={nft?.name}
                                  onError={() => setImgLoaded(true)}
                                  onLoadingComplete={() => setImgLoaded(true)}
                                />
                              </Flex>
                            </Skeleton>
                          </CardHeader>
                          <Stack spacing="3" py={4} pt={0}>
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
                              <Text
                                noOfLines={3}
                                minH={"108px"}
                                margin={"auto"}
                                bg={"gray.100"}
                                p={4}
                                m={0}
                                maxH={"108px"}
                              >
                                {nft.description}
                              </Text>
                            </Skeleton>
                          </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter
                          borderTop={"4px solid black"}
                          p={4}
                          background={"gray.100"}
                          justifyContent={"space-between"}
                        >
                          <ButtonGroup spacing="2" mr={8}>
                            <Button
                              variant="solid"
                              colorScheme="blue"
                              background={"#66ccff"}
                              boxShadow={"lg"}
                            >
                              Buy now
                            </Button>
                          </ButtonGroup>
                          <HStack
                            alignItems={"baseline"}
                            w={"165px"}
                            justifyContent={"space-between"}
                          >
                            <SkeletonCircle isLoaded={imgLoaded}>
                              <IconButton
                                padding={"10px"}
                                variant={"unstyled"}
                                boxShadow={"md"}
                                _active={{
                                  transform: "scale(0.9)",
                                  boxShadow: "sm",
                                }}
                                borderRadius={"full"}
                                width={"auto"}
                                aria-label="favorite"
                                color={nft.isFavorite ? "red" : "black"}
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
                                icon={
                                  nft.isFavorite ? (
                                    <Text>♥</Text>
                                  ) : (
                                    <Text>♡</Text>
                                  )
                                }
                              />
                            </SkeletonCircle>
                            <Text
                              color="black"
                              fontWeight="bold"
                              fontSize="md"
                              alignSelf={"center"}
                            >
                              {nft.price} ETH
                            </Text>
                          </HStack>
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
