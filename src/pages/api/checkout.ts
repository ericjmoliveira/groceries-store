import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { handleAuthToken } from '@/middlewares/auth';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { Response } from '@/interfaces';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const id = handleAuthToken(req, res)!;

  try {
    const bodySchema = z.object({
      itemsList: z
        .array(
          z.object({
            id: z.string(),
            quantity: z.number().min(1)
          }),
          { required_error: 'Items list is required' }
        )
        .nonempty({ message: 'At least one item must be provided' })
    });

    const { itemsList } = bodySchema.parse(req.body);

    const products = await prisma.product.findMany({
      where: { id: { in: itemsList.map((item) => item.id) } }
    });

    const customer = await stripe.customers.create({
      metadata: {
        userId: id,
        itemsList: JSON.stringify(itemsList)
      }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer: customer.id,
      line_items: products.map((product) => {
        return {
          price_data: {
            currency: 'brl',
            product_data: {
              name: product.name,
              images: [product.image]
            },
            unit_amount: product.price
          },
          quantity: itemsList.find((item) => item.id === product.id)?.quantity
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`
    });

    return res.status(200).json({
      success: true,
      data: { url: session.url! }
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
