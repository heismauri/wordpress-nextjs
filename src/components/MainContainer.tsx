import { ReactNode } from 'react';

import HeaderBar from '@/components/HeaderBar';
import Footer from '@/components/Footer';

const MainContainer = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <HeaderBar />
      <main className="container lg:max-w-6xl px-6">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainContainer;
