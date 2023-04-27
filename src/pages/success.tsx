import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { useCartStore } from '@/store/cart';
import { useEffect } from 'react';

export default function Success() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Head>
        <title>Success</title>
      </Head>
      <h2 className="text-2xl font-semibold">Success</h2>
      <div className="flex flex-col items-center justify-center mt-32 md:mt-16">
        <span className="text-lg font-semibold mb-4">Purchase successful</span>
        <span className="mb-4">Thank you for your purchase!</span>
        <Image src={'./empty-cart.svg'} width={250} height={250} alt="Empty cart" />
        <Link href={'/'} className="underline">
          Continue shopping
        </Link>
      </div>
    </>
  );
}
