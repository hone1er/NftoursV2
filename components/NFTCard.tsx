import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Button,
  HStack,
  IconButton,
  Image,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { MouseEventHandler, ReactEventHandler } from "react";
import { NFT } from "../utils/interfaces";

interface NFTCardProps {
  nft: NFT;
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
      <ModalHeader>
        {nft?.name} {nft?.isFavorite ? "❤️" : null}
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Skeleton isLoaded={isCardLoaded}>
          <Image
            p={2}
            pt={4}
            src={nft?.image}
            alt={nft?.name}
            h={"auto"}
            width={"100%"}
            maxW={"500px"}
            minW={"280px"}
            borderRadius={"lg"}
            borderBottomRadius={"0px"}
            onLoad={onLoad}
          />
        </Skeleton>
        <label>Location: </label>
        <Text fontSize="xl" fontWeight="semibold" p={2}>
          {nft?.location}
        </Text>
        {displayPurchaseDetails && (
          <>
            <label>Date visited: </label>
            <Text fontSize="xl" fontWeight="semibold" p={2}></Text>
            <label>Special note: </label>
            <Text fontSize="xl" fontWeight="semibold" p={2}></Text>
          </>
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
