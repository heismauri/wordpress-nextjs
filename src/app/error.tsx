'use client';

import Link from 'next/link';

import Layout from '@/components/MainContainer';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <Layout>
      <h1>Oops!</h1>
      <p className="my-3">Sorry, an unexpected error has occurred.</p>
      <p className="mb-3">
        <Link href="/" className="text-primary-600 hover:text-primary-500">Return to the home page</Link>
      </p>
      <p className="mb-3 text-red-400">
        <i>{error.message}</i>
      </p>
      <button
        type="button"
        className="btn text-white bg-primary-600 hover:bg-primary-500"
        onClick={() => reset()}
      >
        Try again
      </button>
    </Layout>
  );
};

export default Error;
