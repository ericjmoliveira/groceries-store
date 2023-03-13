import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import prisma from '../libs/prisma';

export default {
  async show(req: Request, res: Response) {
    const id = res.locals.payload.id;

    try {
      const user = await prisma.user.findFirst({
        where: { id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: false,
          createdAt: true,
          updatedAt: true,
          orders: {
            orderBy: {
              orderedAt: 'desc'
            }
          }
        }
      });
      if (!user) return res.status(404).json({ error: 'User not found' });

      return res.status(200).json(user);
    } catch {
      return res.status(500).json({ error: 'An error occurred, try again later' });
    }
  },

  async update(req: Request, res: Response) {
    const { currentPassword, newEmail, newPassword } = req.body;
    const id = res.locals.payload.id;

    if (!currentPassword) return res.status(403).json({ error: 'Current password not provided' });

    if (!newEmail && !newPassword) return res.status(422).json({ error: 'Insufficient data' });

    try {
      const user = await prisma.user.findFirst({ where: { id } });
      const correctPassword = await bcrypt.compare(currentPassword, user?.password!);

      if (!correctPassword) return res.status(401).json({ error: 'Unauthorized' });

      if (newEmail) {
        const emailRegistered = await prisma.user.findFirst({ where: { email: newEmail } });

        if (emailRegistered)
          return res.status(409).json({ error: 'Email already registered, try another one' });

        const updatedUser = await prisma.user.update({
          where: { id },
          data: {
            email: newEmail
          }
        });

        return res.status(201).json({ user: updatedUser, message: 'Email successfully updated!' });
      }

      if (newPassword) {
        const hash = await bcrypt.hash(newPassword, 10);

        const user = await prisma.user.update({
          where: { id },
          data: {
            password: hash
          }
        });

        return res.status(201).json({ user, message: 'Password successfully updated!' });
      }
    } catch {
      return res.status(500).json({ error: 'An error occurred, try again later' });
    }
  },

  async destroy(req: Request, res: Response) {
    const id = res.locals.payload.id;

    try {
      await prisma.order.deleteMany({ where: { userId: id } });
      await prisma.user.delete({ where: { id } });

      return res.status(200).json({ message: 'User sucessfully deleted' });
    } catch {
      return res.status(500).json({ error: 'An error occurred, try again later' });
    }
  }
};
