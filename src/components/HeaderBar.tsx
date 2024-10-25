import Link from 'next/link';
import { clsx } from 'clsx';

const HeaderBar = () => {
  const menuLinkClassName = clsx(
    'relative before:absolute before:inset-x-0 before:bottom-0 before:h-0.5 before:bg-lime-500 before:w-0',
    'before:hover:w-full before:transition-all before:duration-300'
  )

  return (
    <header className="text-center">
      <h2 className="py-6">Wordpress Next.js</h2>
      <ul className="flex justify-center space-x-6 lowercase">
        <li>
          <Link href="/" className={menuLinkClassName}>Home</Link>
        </li>
        <li>
          <Link href="/posts" className={menuLinkClassName}>Posts</Link>
        </li>
      </ul>
      <div className="container lg:max-w-6xl px-6">
        <div className="border-t my-6" />
      </div>
    </header>
  );
}

export default HeaderBar;
