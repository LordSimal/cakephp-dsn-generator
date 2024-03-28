import './globals.css';
import React from 'react';

export const metadata = {
  title: 'DSN Generator',
  description:
    'Generate DSN Strings which can be used to define connection configs in e.g. CakePHP',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
