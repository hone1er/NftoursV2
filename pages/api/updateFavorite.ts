// nextjs api endpoint 

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NFTType } from '../../utils/zodTypes';

import { MOCK_NFT_DATA } from '../../utils/mockData';



export default function fetchNFTHandler(
  req: NextApiRequest,
  res: NextApiResponse<NFTType | {error: string}>
) {

  if (req.method === 'PUT') {
    const { id, userWallet, isFavorite } = req.body;
    console.log("🚀 ~ file: updateFavorite.ts:18 ~ req.body", req.body)
    console.log("🚀 ~ file: updateFavorite.ts:18 ~ id", id)
    const nft = MOCK_NFT_DATA.find(nft => nft.id === id);
    console.log("🚀 ~ file: updateFavorite.ts:20 ~ nft", nft)
    if (nft) {
        nft.isFavorite = isFavorite;
        res.status(200).json(nft);
        return;
  }
}
  else {
    res.status(400).json({error: 'Nft not found'})
    return
  }
}
