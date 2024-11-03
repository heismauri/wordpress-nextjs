import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';

import '@/globals.css';

const dmSans = DM_Sans({
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans'
});
const dmSerfilDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-serif-display'
});

const BLOG_NAME = process.env.WORDPRESS_NAME || 'Your Blog Name';
export const metadata: Metadata = {
  title: {
    default: BLOG_NAME,
    template: `%s – ${BLOG_NAME}`
  },
  description: 'A WordPress Next.js starter template'
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerfilDisplay.variable}`}>
      <body className="antialiased relative min-h-screen pb-28 sm:pb-24">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
