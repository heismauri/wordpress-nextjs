import Link from 'next/link';
import { clsx } from 'clsx';
import { Bars3Icon } from '@heroicons/react/24/outline';

import SearchBar from '@/components/SearchBar';

const BLOG_NAME = process.env.WORDPRESS_NAME || 'Your Blog Name';

const HeaderBar = () => {
  const menuLinkClassName = clsx(
    'relative before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-rose-600 before:w-0',
    'before:hover:w-full before:transition-all before:duration-300'
  )

  return (
    <header className="container lg:max-w-6xl text-center px-6">
      <h2 className="text-4xl lowercase pt-6 flex space-x-2 justify-center flex-wrap">
        {BLOG_NAME.split(' ').map((word, index) => {
          return (
              index % 2 == 0 ? (
              <span key={index}>{word}</span>
            ) : (
              <span key={index} className="text-rose-600">{word}</span>
            )
          )
        })}
      </h2>
      <div>
        <div className="border-t-2 border-t-rose-600 mt-6" />
      </div>
      <div className="flex justify-center sm:justify-between items-center my-2 flex-wrap">
        <nav className="mb-2 sm:mb-0">
          <label htmlFor="menu" className="block sm:hidden lowercase font-serif cursor-pointer">
            <Bars3Icon className="w-4 h-4 inline-block mr-1" />
            Menu
          </label>
          <input type="checkbox" id="menu" className="peer hidden" />
          <ul className="hidden sm:flex peer-checked:flex justify-center space-x-6 lowercase py-2">
            <li>
              <Link href="/" className={menuLinkClassName}>Home</Link>
            </li>
            <li>
              <Link href="/posts" className={menuLinkClassName}>Posts</Link>
            </li>
          </ul>
        </nav>
        <div className="sm:max-w-72 w-full">
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
