'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { clsx } from 'clsx';

const Navbar = () => {
  const currentPath = usePathname();
  const menuLinkClassName = clsx(
    'block hover:text-sky-600 border-b border-transparent hover:border-sky-600 p-3'
  );

  return (
    <nav className="max-sm:w-full">
      <label
        htmlFor="menu"
        className={clsx(
          menuLinkClassName,
          'font-bold block sm:hidden lowercase cursor-pointer transition-colors duration-300'
        )}
      >
        <Bars3Icon className="w-4 h-4 inline-block mr-1" />
        Menu
      </label>
      <input type="checkbox" id="menu" className="peer hidden" />
      <ul className="hidden sm:flex peer-checked:flex justify-center lowercase flex-wrap max-sm:flex-col">
        <li>
          <Link href="/" className={menuLinkClassName}>
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/posts"
            className={menuLinkClassName}
            {...(currentPath === '/posts' && { 'aria-current': 'page' })}
          >
            Posts
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
