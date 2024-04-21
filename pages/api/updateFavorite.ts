// nextjs api endpoint

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { NFTType } from '../../utils/zodTypes';

import { MOCK_NFT_DATA } from '../../utils/mockData';

export default function fetchNFTHandler(
  req: NextApiRequest,
  res: NextApiResponse<NFTType | { error: string }>
) {
  if (req.method === 'PUT') {
    const { id, isFavorite } = req.body;
    const nft = MOCK_NFT_DATA.find((nft) => nft.id === id);
    if (nft) {
      nft.isFavorite = isFavorite;
      res.status(200).json(nft);
      return;
    } else {
      res.status(400).json({ error: 'Nft not found' });
      return;
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
  res.status(400).json({ error: 'Nft not found' });
  return;
}
