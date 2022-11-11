

// nft interface
export interface NFT {
    id: number;
    name: string;
    description: string;
    image: string;
    geoCode: { lat: number; lng: number };
    location: string;
    price: number;
    owner: string;
    isFavorite: boolean;
    isForSale: boolean;
  }