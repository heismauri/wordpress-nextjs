'use client';

import Link from 'next/link';

import MainContainer from '@/components/MainContainer';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error = ({ error, reset }: ErrorProps) => {
  return (
    <MainContainer>
      <h1 className="mb-6 lowercase">Oops! An error occurred.</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="mb-3">
        <Link href="/" className="text-red-500 no-underline hover:underline">Return to the home page</Link>
      </p>
      <p className="bg-gray-100 rounded-lg w-fit px-3 py-2 font-mono">
        {error.message}
      </p>
      <button
        type="button"
        className="btn mt-6 font-serif hover:text-red-500 lowercase p-0"
        onClick={() => reset()}
      >
        Try again
        <ArrowPathIcon className="h-4 w-4 inline-block" />
      </button>
    </MainContainer>
  );
};

export default Error;
