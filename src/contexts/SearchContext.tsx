'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  isSearchVisible: boolean;
  searchQuery: string;
  showSearch: () => void;
  hideSearch: () => void;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const showSearch = () => setIsSearchVisible(true);
  const hideSearch = () => {
    setIsSearchVisible(false);
    setSearchQuery('');
  };
  const clearSearch = () => setSearchQuery('');

  return (
    <SearchContext.Provider value={{
      isSearchVisible,
      searchQuery,
      showSearch,
      hideSearch,
      setSearchQuery,
      clearSearch,
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
} 