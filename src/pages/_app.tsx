import { AppProps } from 'next/app';
import { useEffect } from 'react';

import { useAuthStore } from '@/store/auth';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const handleAuthState = useAuthStore((state) => state.handleAuthState);

  useEffect(() => {
    handleAuthState();
  }, [handleAuthState]);

  return <Component {...pageProps} />;
}
