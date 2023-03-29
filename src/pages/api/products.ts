import { NextApiRequest, NextApiResponse } from 'next';

import { getProducts } from '@/lib/db';
import { Response } from '@/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  try {
    const products = await getProducts();

    return res.status(200).json({
      success: true,
      data: { products }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
