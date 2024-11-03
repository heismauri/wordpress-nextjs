import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full pb-6 absolute bottom-0">
      <div className="container lg:max-w-6xl px-6">
        <div className="border-t mt-6 mb-4" />
        <div>
          <p className="font-serif lowercase">
            <Link href="/" className="text-rose-600 hover:text-rose-700">
              Your Blog Name
            </Link> –{' '}
            {new Date().getFullYear()} –{' '}
            Powered by{' '}
            <Link href="https://wordpress.org/" className="text-rose-600 hover:text-rose-700">
              WordPress
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
