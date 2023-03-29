import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';
import bcrypt from 'bcrypt';

import { handleAuthToken } from '@/middlewares/auth';
import { prisma } from '@/lib/prisma';
import { Response, User } from '@/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const allowedMethods = ['GET', 'PUT', 'DELETE'];

  if (!allowedMethods.includes(req.method!)) {
    return res.status(405).end();
  }

  const id = handleAuthToken(req, res)!;

  try {
    switch (req.method) {
      case 'GET':
        const data = await prisma.user.findFirst({
          where: { id },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            password: false,
            createdAt: true,
            updatedAt: true,
            purchases: true
          }
        });

        return res.status(200).json({
          success: true,
          data: { user: data as unknown as User }
        });
      case 'PUT':
        const bodySchema = z.object({
          currentPassword: z.string({ required_error: 'Current password is required' }),
          newData: z
            .object(
              {
                firstName: z.string(),
                lastName: z.string(),
                email: z.string().email({ message: 'Email format is invalid' }),
                password: z
                  .string()
                  .min(6, { message: 'New password must contain at least 6 characters' })
              },
              { required_error: 'New data are required' }
            )
            .partial()
            .refine((data) => data.firstName || data.lastName || data.email || data.password, {
              message: 'At least one field must be provided'
            })
        });

        const { currentPassword, newData } = bodySchema.parse(req.body);
        const user = await prisma.user.findFirst({ where: { id } });
        const correctPassword = await bcrypt.compare(currentPassword, user?.password!);

        if (!correctPassword) {
          return res.status(401).json({
            success: false,
            error: 'Password is incorrect'
          });
        }

        if (newData.email) {
          const userExists = await prisma.user.findFirst({ where: { email: newData.email } });

          if (userExists) {
            return res.status(404).json({
              success: false,
              error: 'An user with this email already exists'
            });
          }
        }

        if (newData.password) {
          const hash = await bcrypt.hash(newData.password, 10);
          newData.password = hash;
        }

        const updatedUser = await prisma.user.update({ where: { id }, data: newData });

        return res.status(200).json({
          success: true,
          data: { user: updatedUser as unknown as User },
          message: 'User successfully updated'
        });
      case 'DELETE':
        await prisma.purchase.deleteMany({ where: { userId: id } });
        await prisma.user.delete({ where: { id } });

        return res.status(200).json({
          success: true,
          message: 'User successfully deleted'
        });
    }
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
