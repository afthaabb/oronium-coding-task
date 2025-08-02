// src/components/SearchBarClient.tsx
'use client';

import { useState, useEffect } from 'react';

interface SearchBarProps {
  onSearch?: (query: string) => void; // Optional prop for parent communication
  onClose?: () => void; // Callback to close the search bar
  isVisible?: boolean; // Control visibility from parent
}

export default function SearchBarClient({ onSearch, onClose, isVisible = true }: SearchBarProps) {
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

  if (!isVisible) return null;

  return (
    <div className="mb-8 w-full max-w-2xl relative">
      <label htmlFor="search" className="sr-only">Search posts</label>
      <div className="relative">
        <input
          id="search"
          type="text"
          placeholder="Search posts by title, author, or category..."
          className="w-full p-4 pr-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search blog posts"
          autoFocus
        />
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      {query && (
        <p className="mt-2 text-sm text-gray-500">Searching for: <span className="font-semibold">{query}</span></p>
      )}
    </div>
  );
}