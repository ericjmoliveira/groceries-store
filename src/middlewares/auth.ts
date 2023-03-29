import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

import { Response } from '@/interfaces';

interface Payload {
  id: string;
}

export function handleAuthToken(req: NextApiRequest, res: NextApiResponse<Response>) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized'
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      error: 'Token not provided'
    });
  }

  const secret = process.env.JWT_SECRET!;

  try {
    const payload = jwt.verify(token, secret) as Payload;
    const id = payload.id;

    return id;
  } catch {
    return res.status(401).json({
      success: false,
      error: 'Token is invalid'
    });
  }
}
