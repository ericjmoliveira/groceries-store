import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '@/lib/prisma';
import { Response, User } from '@/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const bodySchema = z.object({
      email: z
        .string({ required_error: 'Email is required' })
        .email({ message: 'Email format is invalid' }),
      password: z
        .string({ required_error: 'Password is required' })
        .min(6, { message: 'Password must contain at least 6 characters' })
    });

    const { email, password } = bodySchema.parse(req.body);
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
        purchases: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'An user with this email was not found'
      });
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return res.status(401).json({
        success: false,
        error: 'Password is incorrect'
      });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ id: user.id }, secret!, { expiresIn: 86400 });

    user.password = undefined!;

    return res.status(200).json({
      success: true,
      data: { user: user as unknown as User, token }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);

      return res.status(400).json({
        success: false,
        error: validationError.details[0].message
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
