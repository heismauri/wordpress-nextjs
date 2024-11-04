import { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MainContainer = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <Header />
      <main className="container lg:max-w-6xl px-6">{children}</main>
      <Footer />
    </>
  );
};

export default MainContainer;
