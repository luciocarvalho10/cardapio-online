import './globals.css';

import type { Metadata } from 'next';

import { Provider } from '@/context/provider';

export const metadata: Metadata = {
  title: 'Cardápio online',
  description: 'Ver todas as opções disponíveis',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`h-full antialiased`}>
      <body className='flex min-h-full flex-col'>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
