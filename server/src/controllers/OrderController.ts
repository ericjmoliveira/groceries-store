import { Request, Response } from 'express';

import prisma from '../libs/prisma';
import stripe from '../libs/stripe';

interface Item {
  id: string;
  quantity: number;
}

interface Product extends Item {
  name: string;
  price: number;
  thumbnail: string;
}

export default {
  async createCheckoutSession(req: Request, res: Response) {
    const itemsOrdered: Item[] = req.body.itemsOrdered;
    const id = res.locals.payload.id;

    const productsData: Product[] = await Promise.all(
      itemsOrdered.map(async (item) => {
        const product = await prisma.product.findFirst({ where: { id: item.id } });

        return {
          id: product?.id!,
          name: product?.name!,
          price: product?.price!,
          quantity: item.quantity!,
          thumbnail: product?.thumbnail!
        };
      })
    );

    const customer = await stripe.customers.create({
      metadata: {
        userId: id,
        itemsData: JSON.stringify(itemsOrdered)
      }
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer: customer.id,
      line_items: productsData.map((product) => {
        return {
          price_data: {
            currency: 'brl',
            product_data: {
              name: product.name,
              images: [product.thumbnail]
            },
            unit_amount: product.price
          },
          quantity: product.quantity
        };
      }),
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`
    });

    return res.status(200).json({ url: session.url });
  },

  async saveOrderData(req: Request, res: Response) {
    const event = req.body;

    if (event.type === 'checkout.session.completed') {
      const data = event.data.object;

      const customer: any = await stripe.customers.retrieve(data.customer);
      const userId = customer.metadata.userId;
      const itemsData = JSON.parse(customer.metadata.itemsData);

      try {
        let total = 0;
        let itemsQuantity = 0;

        const itemsOrdered = await Promise.all(
          itemsData.map(async (item: Item) => {
            const product = await prisma.product.findFirst({ where: { id: item.id } });

            total += product?.price! * item.quantity;
            itemsQuantity += item.quantity;

            return {
              id: product?.id!,
              name: product?.name!,
              price: product?.price!,
              quantity: item.quantity!,
              thumbnail: product?.thumbnail!,
              subTotal: product?.price! * item.quantity
            };
          })
        );

        const cartData = {
          total,
          itemsQuantity,
          itemsOrdered
        };

        await prisma.order.create({
          data: {
            userId,
            cartData
          }
        });

        res.status(200).end();
      } catch {
        return res.status(500).end();
      }
    }
  }
};
