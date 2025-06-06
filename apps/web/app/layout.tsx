import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const SUIT = localFont({
  src: '../assets/fonts/SUIT-Variable-ttf/SUIT-Variable.ttf',
  variable: '--font-suit',
});

export const metadata: Metadata = {
  title: '인하벤처클럽',
  description: '인하벤처클럽 홈페이지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${SUIT.variable} antialiased`}>{children}</body>
    </html>
  );
}
