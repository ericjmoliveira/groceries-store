import { ReactNode } from 'react';

interface ContentProps {
  children: ReactNode;
}

export function Content({ children }: ContentProps) {
  return <main className="min-h-screen p-4 md:p-8">{children}</main>;
}
