import { Request, Response } from 'express';

import prisma from '../libs/prisma';

export default {
  async index(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany();

      return res.status(200).json(products);
    } catch {
      return res.status(500).json({ error: 'An error occurred, try again later' });
    }
  }
};
