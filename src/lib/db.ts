import { prisma } from './prisma';

export async function getProducts() {
  try {
    const products = await prisma.product.findMany();

    return products;
  } catch (error) {
    console.log(error);
  }
}
