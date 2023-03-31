import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { useAuthStore } from '@/store/auth';

export default function Purchases() {
  const user = useAuthStore((state) => state.user);
  const authenticated = useAuthStore((state) => state.authenticated);

  return (
    <>
      <Head>
        <title>Purchases</title>
      </Head>
      <h2 className="text-2xl font-semibold">Purchases</h2>
      {!authenticated || user?.purchases.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 md:mt-16">
          <span className="text-lg font-semibold mb-4">No purchases made yet</span>
          <span className="mb-4">Check back after your next shopping trip!</span>
          <Image src={'./empty-cart.svg'} width={250} height={250} alt="Empty cart" />
          <Link href={'/'} className="underline">
            Shop now
          </Link>
        </div>
      ) : (
        <section className="mt-8">
          {user?.purchases.map((purchase) => (
            <div key={purchase.id} className="py-4 border-t border-t-gray-500">
              <div className="flex flex-col mb-4 text-lg font-medium">
                <span>Purchase ID: {purchase.id}</span>
                <span>Purchase Date: {new Date(purchase.purchasedAt).toLocaleDateString()}</span>
                <span>Total Price: ${purchase.data.totalPrice.toFixed(2)}</span>
                <span>Total Items: {purchase.data.totalItems}</span>
              </div>
              <div>
                {purchase.data.itemsList.map((item) => (
                  <div key={item.id} className="flex flex-col justify-between">
                    <div className="flex items-center gap-4">
                      <Image src={item.image} width={50} height={50} alt={`${item.name} image`} />
                      <div className="flex flex-col">
                        <Link href={`/${item.slug}`} className="hover:underline">
                          {item.name}
                        </Link>
                        <span className="font-medium">(${item.price}/ea)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <span className="font-medium">Quantity: {item.quantity}</span>
                      <span className="font-medium">Subtotal: ${item.subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
