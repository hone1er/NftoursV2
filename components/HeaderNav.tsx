import React from "react";

import {
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  Search2Icon,
  ViewIcon,
  SettingsIcon,
} from "@chakra-ui/icons";

import useAppContext from "../context/AppContext";
import Link from "next/link";

export function HeaderNav() {
  const { ensName, address, router, isConnected, connect, disconnect } =
    useAppContext();
  return (
    <Flex
      width={"100%"}
      backgroundImage={"linear-gradient(to right, #0000ff90, #66ccff)"}
      height={"85px"}
      p={4}
      m={0}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Button
        size={"lg"}
        variant={"unstyled"}
        onClick={() => router.push("/")}
        fontSize={"3xl"}
        color={"gray.100"}
        fontWeight={"bold"}
        textTransform={"none"}
        width={"fit-content"}
      >
        NFTours
      </Button>

      <HStack pos={"relative"} zIndex={2}>
        {isConnected ? (
          <>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<HamburgerIcon />}
                variant="outline"
                width={"48px"}
                color={"whiteAlpha.900"}
                _hover={{ background: "gray.700" }}
                _active={{ color: "whiteAlpha.900" }}
              />
              <MenuList w={"100px"} pos={"relative"} zIndex={2}>
                <MenuGroup title="Wallet">
                  <MenuItem
                    onClick={() =>
                      window.open(
                        `https://www.etherscan.io/address/${address}`,
                        "_blank"
                      )
                    }
                  >
                    {ensName ||
                      `${address?.substring(0, 5)}...${address?.substring(
                        address?.length - 4
                      )}`}
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Navigation">
                  <Link prefetch href="/discover">
                    <MenuItem icon={<Search2Icon />}>Discover</MenuItem>
                  </Link>
                  <Link prefetch href="/gallery">
                    <MenuItem icon={<ViewIcon />}>Gallery</MenuItem>
                  </Link>
                </MenuGroup>
                <MenuDivider />
                <MenuGroup title="Account">
                  <MenuItem
                    onClick={() => router.push("/settings")}
                    icon={<SettingsIcon />}
                  >
                    Settings
                  </MenuItem>
                </MenuGroup>
                <MenuDivider />
                <MenuItem onClick={() => router.push("/about")}>
                  Learn more
                </MenuItem>
                <MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) : (
          <Button
            size={"xs"}
            variant={"primary"}
            margin={2}
            fontSize={"16px"}
            onClick={() => connect()}
          >
            Connect
          </Button>
        )}
      </HStack>
    </Flex>
  );
}
