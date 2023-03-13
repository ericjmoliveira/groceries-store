import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function verifyAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  const secret = process.env.SECRET;

  try {
    res.locals.payload = jwt.verify(token, secret!);
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }

  next();
}
