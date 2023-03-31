import { AppProps } from 'next/app';
import { useState, useEffect } from 'react';

import { useCartStore } from '@/store/cart';
import { useProductsStore } from '@/store/products';
import { useAuthStore } from '@/store/auth';
import { Layout } from '@/components/layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  const populateCart = useCartStore((state) => state.populateCart);
  const populateProductsList = useProductsStore((state) => state.populateProductsList);
  const handleAuthState = useAuthStore((state) => state.handleAuthState);

  useEffect(() => {
    const handleAppState = async () => {
      populateCart();
      await populateProductsList();
      await handleAuthState();

      setLoading(false);
    };

    handleAppState();
  }, [populateCart, populateProductsList, handleAuthState]);

  if (loading) return null;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
