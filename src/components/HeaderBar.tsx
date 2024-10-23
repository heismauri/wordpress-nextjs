import Link from 'next/link';

const HeaderBar = () => {
  return (
    <header className="text-center">
      <h2 className="my-6">Wordpress Next.js</h2>
      <ul className="flex justify-center space-x-6 uppercase">
        <li>
          <Link href="/" className="hover:underline">Home</Link>
        </li>
        <li>
          <Link href="/posts" className="hover:underline">Posts</Link>
        </li>
      </ul>
      <div className="container lg:max-w-6xl px-6">
        <div className="border-t my-6" />
      </div>
    </header>
  );
}

export default HeaderBar;
