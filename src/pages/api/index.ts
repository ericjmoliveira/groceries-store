import { NextApiRequest, NextApiResponse } from 'next';

import { Response } from '@/interfaces';

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  return res.status(200).json({
    success: true,
    message: 'Hello world!'
  });
}
