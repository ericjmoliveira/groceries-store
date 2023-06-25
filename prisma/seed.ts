import { PrismaClient } from '@prisma/client';

import { inventory } from '../src/helpers/inventory';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({ data: inventory });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
