'use client';

import { useSearchParams } from 'next/navigation';
import { clsx } from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  return (
    <form action="/posts" className="w-full relative">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <button type="submit">
        <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
      </button>
      <input
        className={clsx(
          'w-full pl-9 pr-3 py-3 bg-transparent focus:outline-none placeholder:text-gray-400 placeholder:lowercase',
          'border-b border-transparent focus:border-sky-600 hover:border-sky-300 transition duration-300 ease'
        )}
        type="search"
        name="search"
        defaultValue={search}
        placeholder="Search posts..."
      />
    </form>
  );
};

export default SearchBar;
