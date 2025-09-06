import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DialerProvider } from '@/contexts/DialerContext';
import { ContactsProvider } from '@/contexts/ContactsContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PowerDialer - Operative System',
  description: 'Advanced power dialing system with AI-powered features',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DialerProvider>
          <ContactsProvider>
            {children}
          </ContactsProvider>
        </DialerProvider>
      </body>
    </html>
  );
}