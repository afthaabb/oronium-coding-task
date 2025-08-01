// src/components/SearchBarClient.tsx
'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void; // Optional prop for parent communication
}

export default function SearchBarClient({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    // Optional: Implement debouncing if calling an API directly
    // const handler = setTimeout(() => {
    //   onSearch?.(query);
    // }, 300);
    // return () => clearTimeout(handler);

    // For now, just pass the query up if needed by parent
    onSearch?.(query);
  }, [query, onSearch]);

  return (
    <div className="mb-8 w-full max-w-2xl">
      <label htmlFor="search" className="sr-only">Search posts</label>
      <input
        id="search"
        type="text"
        placeholder="Search posts by title or excerpt..."
        className="w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search blog posts"
      />
      {/* <p className="mt-2 text-sm text-gray-500">You are searching for: <span className="font-semibold">{query}</span></p> */}
    </div>
  );
}