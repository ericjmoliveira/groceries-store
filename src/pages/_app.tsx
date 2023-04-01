import { AppProps } from 'next/app';
import { useEffect } from 'react';

import { useCartStore } from '@/store/cart';
import { useProductsStore } from '@/store/products';
import { useAuthStore } from '@/store/auth';
import { Layout } from '@/components/layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const populateCart = useCartStore((state) => state.populateCart);
  const populateProductsList = useProductsStore((state) => state.populateProductsList);
  const handleAuthState = useAuthStore((state) => state.handleAuthState);

  useEffect(() => {
    populateCart();
    populateProductsList();
    handleAuthState();
  }, [populateCart, populateProductsList, handleAuthState]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
