// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.10;

import "ds-test/test.sol";
import {NFTour} from "../Contract.sol";

contract NFTourTest is DSTest {

    address owner;
    string tokenURI;

    function setUp() public {
         owner = msg.sender;
         tokenURI = "localhost:3000";
    }

    function testMint() public {
        NFTour nft = new NFTour();

        nft.mintNFT(msg.sender, tokenURI);
        assertEq(nft.ownerOf(1),msg.sender);
        
    }
}
