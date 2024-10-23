import { Suspense } from 'react';

import MainContainer from '@/components/MainContainer';
import LatestPosts from '@/components/LatestPosts';

const Home = () => {
  return (
    <MainContainer>
      <Suspense fallback={<p>Loading feed...</p>}>
        <LatestPosts />
      </Suspense>
    </MainContainer>
  );
}

export default Home;
