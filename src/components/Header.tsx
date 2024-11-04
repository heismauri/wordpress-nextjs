import Navbar from '@/components//Navbar';
import SearchBar from '@/components/SearchBar';

const BLOG_NAME = process.env.WORDPRESS_NAME || 'Your Blog Name';

const Header = () => {
  return (
    <header className="container lg:max-w-6xl px-6">
      <h2 className="text-4xl lowercase pt-6 flex space-x-2 justify-center flex-wrap text-center">
        {BLOG_NAME.split(' ').map((word, index) => {
          return index % 2 == 0 ? (
            <span key={index}>{word}</span>
          ) : (
            <span key={index} className="text-sky-600">
              {word}
            </span>
          );
        })}
      </h2>
      <div>
        <div className="border-t-2 border-t-sky-600 mt-6" />
      </div>
      <div className="flex justify-center sm:justify-between items-end flex-wrap -mb-[1px]">
        <Navbar />
        <div className="sm:max-w-72 w-full">
          <SearchBar />
        </div>
      </div>
      <div>
        <div className="border-t mb-6 -z-10" />
      </div>
    </header>
  );
};

export default Header;
