import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import React, { useEffect } from "react";
import { NFTType } from "../utils/zodTypes";
import Image from "next/image";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Box, Button, Modal, useDisclosure } from "@chakra-ui/react";
import { NFTCardFront, NFTCardBack } from "./NFTCard";
import { LatLngExpression } from "leaflet";

interface MapProps {
  nfts: any;
  center: { lat: number; lng: number };
  setSelectedNFTId: any;
}

function Map({ nfts, center, setSelectedNFTId }: MapProps) {
  const mapCenter: LatLngExpression = center
    ? [center.lat, center.lng]
    : [38.0171441, -122.2885808];

  console.count();

  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box pos={"relative"} zIndex={0} width={"100%"} height={"500px"}>
      <MapContainer className="map" center={mapCenter} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {nfts && (
          <Box zIndex={1} width={"100%"} height={"500px"}>
            {nfts?.map((obj: NFTType, idx: number) => {
              return (
                <Marker
                  key={idx}
                  position={obj.geoCode}
                  eventHandlers={{
                    click: () => {
                      setSelectedNFTId(obj?.id);
                    },
                  }}
                >
                  <Modal
                    isOpen={isOpen}
                    onClose={() => {
                      onToggle;
                    }}
                  >
                    {true ? (
                      <NFTCardFront
                        displayPurchaseDetails={true}
                        nft={nfts && nfts[obj.id]}
                        handleFlip={() => {}}
                        onLoad={() => {}}
                        handleFavorite={async () => {}}
                      />
                    ) : (
                      <NFTCardBack
                        nft={nfts && nfts[obj.id]}
                        handleFlip={() => {}}
                      />
                    )}
                  </Modal>
                </Marker>
              );
            })}
          </Box>
        )}
      </MapContainer>
    </Box>
  );
}
export default Map;
