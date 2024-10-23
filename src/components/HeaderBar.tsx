import Link from 'next/link';

const HeaderBar = () => {
  return (
    <header className="text-center">
      <h2 className="py-6">Wordpress Next.js</h2>
      <ul className="flex justify-center space-x-6 lowercase font-serif">
        <li>
          <Link href="/" className="hover:text-red-500">Home</Link>
        </li>
        <li>
          <Link href="/posts" className="hover:text-red-500">Posts</Link>
        </li>
      </ul>
      <div className="container lg:max-w-6xl px-6">
        <div className="border-t my-6" />
      </div>
    </header>
  );
}

export default HeaderBar;
