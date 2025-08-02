'use client';

import Link from 'next/link';
import { useSearch } from '@/contexts/SearchContext';

const Header = () => {
  const { showSearch } = useSearch();

  return (
    <header className="py-6 bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold text-black">
          Beyond
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-black hover:text-gray-600 transition-colors">Home</Link>
          <Link href="#" className="text-black hover:text-gray-600 transition-colors">Blog</Link>
          <Link href="#" className="text-black hover:text-gray-600 transition-colors">About Us</Link>
          <Link href="#" className="text-black hover:text-gray-600 transition-colors">Contact Us</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button 
            onClick={showSearch}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
          <button className="border border-black text-black px-6 py-2 rounded-full font-semibold hover:bg-black hover:text-white transition-colors">
            Demo
          </button>
          <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
