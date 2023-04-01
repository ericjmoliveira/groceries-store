import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

interface Customer {
  metadata: {
    userId: string;
    itemsList: string;
  };
}

interface Item {
  id: string;
  quantity: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const event = req.body;

  if (event.type === 'checkout.session.completed') {
    const eventData = event.data.object;

    const customer = (await stripe.customers.retrieve(eventData.customer)) as unknown as Customer;
    const userId = customer.metadata.userId;
    const itemsList = JSON.parse(customer.metadata.itemsList) as Item[];

    try {
      const products = await prisma.product.findMany({
        where: { id: { in: itemsList.map((item) => item.id) } }
      });

      let totalPrice = 0;
      let totalItems = 0;

      products.forEach((product) => {
        totalPrice += product.price * itemsList.find((item) => item.id === product.id)?.quantity!;
        totalItems += itemsList.find((item) => item.id === product.id)?.quantity!;
      });

      const orderedItems = products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.image,
          quantity: itemsList.find((item) => item.id === product.id)?.quantity!,
          subTotal: product.price * itemsList.find((item) => item.id === product.id)?.quantity!
        };
      });

      const data = { totalPrice, totalItems, itemsList: orderedItems };

      await prisma.purchase.create({ data: { userId, data } });

      return res.status(200).end();
    } catch (error) {
      return res.status(500).end();
    }
  }
}
