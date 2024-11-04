import MainContainer from '@/components/MainContainer';
import LatestPosts from '@/components/LatestPosts';
import TrendingPosts from '@/components/TrendingPosts';

const Home = () => {
  return (
    <MainContainer>
      <LatestPosts />
      <TrendingPosts />
    </MainContainer>
  );
};

export default Home;
