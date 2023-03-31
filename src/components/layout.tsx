import { ReactNode } from 'react';
import { useRouter } from 'next/router';

import { Header } from './header';
import { Content } from './content';
import { Footer } from './footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { pathname } = useRouter();
  const renderHeader = pathname !== '/signin' && pathname !== '/signup';

  return (
    <>
      {renderHeader && <Header />}
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
