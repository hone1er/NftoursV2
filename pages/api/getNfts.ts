// nextjs api endpoint 

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NFTType } from '../../utils/zodTypes';

import { MOCK_NFT_DATA } from '../../utils/mockData';



export default function fetchNFTHandler(
  req: NextApiRequest,
  res: NextApiResponse<NFTType[] | {error: string}>
) {

  if (req.method === 'GET') {
    res.status(200).json(MOCK_NFT_DATA)
    return
  }
  else {
    res.status(400).json({error: 'Bad request'})
    return
  }
}
