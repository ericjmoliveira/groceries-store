import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';
import { createCheckoutSession } from '@/services/api';

export default function Cart() {
  const { totalPrice, totalItems, itemsList } = useCartStore((state) => state.data);
  const handleCart = useCartStore((state) => state.handleCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const authenticated = useAuthStore((state) => state.authenticated);
  const router = useRouter();

  const handleCheckout = async () => {
    if (!authenticated) return router.push('/signin');

    const items = itemsList.map((item) => ({ id: item.id, quantity: item.quantity }));
    const response = await createCheckoutSession(items);

    if (response?.success) {
      const url = response.data?.url;

      if (url) {
        alert(
          'In the checkout page, to simulate a successful purchase:\n\n1. Add an email (it can be any email with valid format)\n2. Add the following credit card number: 4242 4242 4242 4242\n3. Add any valid expiration date\n4. Add any CVC number\n5. Add the name on the card (it can be any name)'
        );

        window.location.href = url;
      }
    }
  };

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <h2 className="text-2xl font-semibold">Cart ({totalItems} items)</h2>
      {totalItems !== 0 && (
        <button className="underline" onClick={clearCart}>
          Clear cart
        </button>
      )}
      {totalItems === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 md:mt-16">
          <span className="text-lg font-semibold mb-4">Time to start shopping!</span>
          <span className="mb-4">Your cart is empty</span>
          <Image src={'./empty-cart.svg'} width={250} height={250} alt="Empty cart" />
          <Link href={'/'} className="underline">
            Shop now
          </Link>
        </div>
      ) : (
        <section className="mt-8">
          <div className="flex items-center justify-between mb-8">
            <span className="text-2xl font-semibold">Total: ${totalPrice.toFixed(2)}</span>
            <button
              onClick={handleCheckout}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-800 transition"
            >
              Continue to checkout
            </button>
          </div>
          {itemsList.map((item) => (
            <div key={item.id} className="flex flex-col justify-between mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Image src={item.image} width={50} height={50} alt={`${item.name} image`} />
                <div className="flex flex-col">
                  <Link href={`/${item.slug}`} className="hover:underline">
                    {item.name}
                  </Link>
                  <span className="font-medium">(${item.price}/ea)</span>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <span className="font-medium">${item.subtotal.toFixed(2)}</span>
                <button onClick={() => handleCart(item.id, false, true)} className="underline">
                  Remove
                </button>
                <div className="w-1/3 md:w-1/12 h-9 flex items-center justify-between mb-2 p-2 bg-transparent text-black text-sm font-medium border border-gray-500 rounded-full">
                  <button
                    onClick={() => {
                      handleCart(item.id, false);
                    }}
                    className="w-4 h-4 flex items-center p-3 justify-center text-sm rounded-full hover:bg-gray-500 hover:text-white"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => {
                      handleCart(item.id, true);
                    }}
                    className="w-4 h-4 flex items-center p-3 justify-center text-sm rounded-full hover:bg-gray-500 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}
    </>
  );
}
