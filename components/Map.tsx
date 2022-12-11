import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Box, useDisclosure } from "@chakra-ui/react";

import { MOCK_NFT_DATA } from "../utils/mockData";
import { NFTschema, NFTType } from "../utils/zodTypes";

export default function Places({
  setSelectedNFTId,
}: {
  setSelectedNFTId: (nftId: number) => void;
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_KEY}`,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map setSelectedNFTId={setSelectedNFTId} />;
}

function Map({
  setSelectedNFTId,
}: {
  setSelectedNFTId: (nftId: number) => void;
}) {
  const [selected, setSelected] = useState<any>(null);
  const [markers, setMarkers] = useState<NFTType[]>();
  useEffect(() => {
    setMarkers(MOCK_NFT_DATA);
    if (NFTschema.safeParse(MOCK_NFT_DATA[0]).success) {
      console.log("YAAAAy");
    }
  }, []);

  //   useEffect(() => {
  //     const geoCode = async () => {
  //       const results = await getGeocode({
  //         address: markers[0].location,
  //       });
  //       const { lat, lng } = await getLatLng(results[0]);
  //       setSelected({ lat, lng });
  //       console.log({ lat, lng });
  //     };
  //     geoCode();
  //     return () => {};
  //   }, []);

  const mapRef: any = useMemo(() => {
    return mapRef?.current;
  }, []);
  const center = useMemo(
    () => (selected ? selected : { lat: 40.7127753, lng: -74.0059728 }),
    [selected]
  );

  return (
    <>
      <Box
        className="places-container"
        pos={"absolute"}
        top={"120px"}
        left={"calc(50vw - 120px)"}
        zIndex={10}
      ></Box>

      <GoogleMap
        ref={mapRef}
        zoom={10}
        center={center}
        mapContainerStyle={{ width: "100vw", height: "50vh" }}
        mapContainerClassName="map-container"
      >
        {markers &&
          markers.map((marker) => {
            if (NFTschema.safeParse(marker).success) {
              return (
                <Marker
                  key={marker.id}
                  position={marker?.geoCode}
                  onClick={() => setSelectedNFTId(marker?.id)}
                />
              );
            }
          })}
      </GoogleMap>
    </>
  );
}
