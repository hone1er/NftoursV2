import React from "react";
import { NFTType } from "../utils/zodTypes";

const useIsFavorite = () => {
  const [data, setData] = React.useState<NFTType>();
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  console.count();
  const handleFavorite = async (nft: NFTType) => {
    setIsLoading(true);
    const res = await fetch("/api/updateFavorite", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: nft?.id,
        isFavorite: !nft?.isFavorite,
      }),
    });

    const updatedNFT = await res.json();
    if (updatedNFT?.error) {
      setError(updatedNFT?.error);
      setIsLoading(false);
      return;
    } else {
      setData(updatedNFT);
    }

    setIsLoading(false);
  };

  return {
    data,
    isError: error,
    isLoading,
    handleFavorite,
  };
};

export default useIsFavorite;
