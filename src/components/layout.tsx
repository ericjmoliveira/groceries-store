import { ReactNode } from 'react';

import { Header } from './header';
import { Content } from './content';
import { Footer } from './footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
