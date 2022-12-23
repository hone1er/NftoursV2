import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { NFTType } from "../../utils/zodTypes";

const DiscoverCard = ({
  image,
  location,
  price,
  handleClick,
}: any): JSX.Element => {
  return (
    <HStack
      as={Button}
      onClick={handleClick}
      variant="unstyled"
      minH={"250px"}
      width={"100%"}
      borderRadius={"md"}
      justifyContent={"space-between"}
      bg={"gray.100"}
      p={4}
    >
      <Box height={"auto"} width={"320px"}>
        <Image src={image} />
      </Box>
      <Box bg={"gray.50"} p={8} minW={"300px"}>
        <VStack alignItems={"flex-end"}>
          <HStack>
            <Text>Location:</Text>
            <Text>{location}</Text>
          </HStack>
          <HStack>
            <Text>Price:</Text>
            <Text>{price}</Text>
          </HStack>
        </VStack>
      </Box>
    </HStack>
  );
};

export default DiscoverCard;
