import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import prisma from '../libs/prisma';

export default {
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) return res.status(422).json({ error: 'Email is required' });
    if (!password) return res.status(422).json({ error: 'Password is required' });

    try {
      const user = await prisma.user.findFirst({
        where: { email },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: true,
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

      const correctPassword = await bcrypt.compare(password, user.password!);
      if (!correctPassword) {
        return res.status(401).json({ error: 'Incorrect password' });
      }

      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user.id
        },
        secret!,
        {
          expiresIn: 86400
        }
      );

      user.password = undefined!;

      return res.status(200).json({ user, token });
    } catch {
      return res.status(500).json({ error: 'An error occurred, try again later' });
    }
  },

  async signUp(req: Request, res: Response) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) return res.status(422).json({ error: 'First name is required' });
    if (!lastName) return res.status(422).json({ error: 'Last name is required' });
    if (!email) return res.status(422).json({ error: 'Email is required' });
    if (!password) return res.status(422).json({ error: 'Password is required' });

    try {
      const userAlreadyExists = await prisma.user.findFirst({ where: { email } });

      if (userAlreadyExists) {
        return res.status(409).json({ error: 'Email already registered, try another email' });
      }

      const hash = await bcrypt.hash(password, 10);

      const newUser = {
        firstName,
        lastName,
        email,
        password: hash
      };

      const user = await prisma.user.create({
        data: newUser,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          password: false,
          createdAt: true,
          updatedAt: true
        }
      });

      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user.id
        },
        secret!,
        {
          expiresIn: 86400
        }
      );

      return res.status(200).json({ user, token });
    } catch {
      return res.status(500).json({ error: 'An error occurred, try again later' });
    }
  }
};
