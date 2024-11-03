import Link from 'next/link';
import { clsx } from 'clsx';
import SearchBar from './SearchBar';

const HeaderBar = () => {
  const menuLinkClassName = clsx(
    'relative before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-rose-600 before:w-0',
    'before:hover:w-full before:transition-all before:duration-300'
  )

  return (
    <header className="container lg:max-w-6xl text-center px-6">
      <h2 className="text-4xl lowercase pt-6">Your <span className="text-rose-600">Blog</span> Name</h2>
      <div>
        <div className="border-t-2 border-t-rose-600 mt-6" />
      </div>
      <div className="flex justify-center sm:justify-between items-center my-2 flex-wrap">
        <ul className="flex justify-center space-x-6 lowercase py-2">
          <li>
            <Link href="/" className={menuLinkClassName}>Home</Link>
          </li>
          <li>
            <Link href="/posts" className={menuLinkClassName}>Posts</Link>
          </li>
        </ul>
        <div className="sm:max-w-72 w-full ">
          <SearchBar />
        </div>
      </div>
      <div>
        <div className="border-t mb-6" />
      </div>
    </header>
  );
}

export default HeaderBar;
