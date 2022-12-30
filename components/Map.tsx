import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import React, { useEffect, useRef } from "react";
import { NFTType } from "../utils/zodTypes";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Box, Modal, useDisclosure } from "@chakra-ui/react";
import { NFTCardFront, NFTCardBack } from "./NFTCard";
import { LatLngExpression } from "leaflet";

interface MapProps {
  nfts: any;
  center: { lat: number; lng: number };
  setSelectedNFTId: any;
  setCenter: any;
}
function Map({ nfts, center, setCenter, setSelectedNFTId }: MapProps) {
  const mapElement = useRef<any>(null);

  const mapCenter: LatLngExpression = center
    ? [center.lat, center.lng]
    : [38.0171441, -122.2885808];

  const { isOpen, onToggle } = useDisclosure();

  // fixes the map not rendering on first load
  useEffect(() => {
    setTimeout(() => {
      mapElement.current?.invalidateSize();
    }, 10);
    return () => {};
  }, [mapElement]);

  return (
    <Box pos={"relative"} zIndex={0} width={"100%"} height={"500px"}>
      <MapContainer
        ref={mapElement}
        className="map"
        center={mapCenter}
        zoom={10}
      >
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
                      setCenter(obj?.geoCode);
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
