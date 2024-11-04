import Link from 'next/link';

const BLOG_NAME = process.env.WORDPRESS_NAME || 'Your Blog Name';

const Footer = () => {
  return (
    <footer className="w-full pb-6 absolute bottom-0">
      <div className="container lg:max-w-6xl px-6">
        <div className="border-t mt-6 mb-4" />
        <div>
          <p className="font-serif lowercase">
            <Link href="/" className="text-sky-600 hover:text-sky-700">
              {BLOG_NAME}
            </Link>{' '}
            – {new Date().getFullYear()} <span className="hidden sm:inline">– </span>
            <br className="sm:hidden" />
            Powered by{' '}
            <Link href="https://wordpress.org/" className="text-sky-600 hover:text-sky-700">
              WordPress
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
