import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Img,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Text,
  useBoolean,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/card";
import { MouseEventHandler, ReactEventHandler } from "react";
import { NFTschema, NFTType } from "../utils/zodTypes";
import { z } from "zod";

interface NFTCardProps {
  nft: z.infer<typeof NFTschema>;
  isFront?: boolean;
  isCardLoaded?: boolean;
  onLoad?: ReactEventHandler<HTMLImageElement> | undefined;
  handlePurchase?: MouseEventHandler<HTMLButtonElement> | undefined;
  handleFlip: MouseEventHandler<HTMLButtonElement> | undefined;
  handleFavorite?: MouseEventHandler<HTMLButtonElement> | undefined;
  displayPurchaseDetails?: boolean;
}
export const NFTCardFront = ({
  nft,
  isCardLoaded,
  onLoad,
  handleFlip,
  handlePurchase,
  handleFavorite,
  displayPurchaseDetails = false,
}: NFTCardProps) => {
  return (
    <ModalContent
      height={"95vh"}
      // flip card transition when iconButton is clicked
    >
      <ModalCloseButton />
      <ModalHeader mt={"36px !important"}>{nft?.name}</ModalHeader>
      <ModalBody>
        <Skeleton isLoaded={isCardLoaded}>
          <Box
            pos={"relative"}
            p={2}
            pt={4}
            h={"auto"}
            width={"100%"}
            maxW={"500px"}
            minW={"280px"}
            minH={"320px"}
            borderRadius={"lg"}
            borderBottomRadius={"0px"}
          >
            <Image
              layout="fill"
              src={nft?.image || ""}
              alt={nft?.name}
              onLoad={onLoad}
            />
          </Box>
        </Skeleton>
        <label>Location: </label>
        <Text fontSize="xl" fontWeight="semibold" py={2}>
          {nft?.location} {nft?.isFavorite ? "❤️" : null}
        </Text>
        {displayPurchaseDetails && (
          <Box>
            <label>Date visited: </label>
            <Text fontSize="xl" fontWeight="semibold" p={2}></Text>
            <label>Special note: </label>
            <Text fontSize="xl" fontWeight="semibold" p={2}></Text>
          </Box>
        )}
        <Text p={2}>Price: {nft?.price} ETH</Text>
      </ModalBody>
      <ModalFooter>
        <HStack width={"100%"} justifyContent={"space-between"}>
          <IconButton
            aria-label="flip-card"
            icon={<ChevronLeftIcon />}
            onClick={handleFlip}
            variant={"unstyled"}
            width={"48px"}
          />
          <HStack>
            <Button width={"210px"} onClick={handleFavorite}>
              {nft?.isFavorite ? (
                <Text>UnFavorite</Text>
              ) : (
                <Text>Favorite ❤️</Text>
              )}
            </Button>
            <Button onClick={() => {}}>Buy</Button>
          </HStack>
        </HStack>
      </ModalFooter>
    </ModalContent>
  );
};

// NFT card back
export const NFTCardBack = ({ nft, handleFlip }: NFTCardProps) => {
  return (
    <ModalContent height={"95vh"}>
      <ModalHeader>
        {nft?.name} {nft?.isFavorite ? "❤️" : null}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text fontSize="xl" fontWeight="semibold" p={2}>
          {nft?.description}{" "}
        </Text>
        <Text p={2}>Price: {nft?.price} ETH</Text>
      </ModalBody>
      <ModalFooter>
        <HStack width={"100%"} justifyContent={"flex-start"}>
          <IconButton
            aria-label="flip-card"
            icon={<ChevronLeftIcon />}
            onClick={handleFlip}
            variant={"unstyled"}
            width={"48px"}
          />
        </HStack>
      </ModalFooter>
    </ModalContent>
  );
};
