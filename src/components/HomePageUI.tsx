// src/components/HomePageUI.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import SearchBarClient from './SearchBarClient';
import { useSearch } from '@/contexts/SearchContext';
// Make sure the Post type is exported from PostCard.tsx or a shared types file.
import { Post } from './PostCard';

// A small, self-contained component for the "Other featured posts" list items.
const OtherFeaturedPostItem = ({ post }: { post: Post }) => (
  <Link href={`/posts/${post.id}`} className="flex items-center space-x-4 group">
    <div className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden shadow-md">
      <Image
        src={post.imageUrl}
        alt={post.title}
        width={80}
        height={56}
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <h3 className="text-sm font-semibold text-zinc-800 group-hover:text-red-500 transition-colors flex-1 leading-snug">
      {post.title}
    </h3>
  </Link>
);

// A small, self-contained component for the cards in the "Recent Posts" section.
const RecentPostCard = ({ post }: { post: Post }) => (
  <Link href={`/posts/${post.id}`} className="block group">
    <div className="space-y-3">
      <div className="overflow-hidden rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={400}
          height={250}
          className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="space-y-2 pt-2">
        <h3 className="text-lg font-bold text-zinc-900 group-hover:text-red-500 transition-colors leading-tight">{post.title}</h3>
        <p className="text-zinc-600 text-sm leading-relaxed">
          {/* Using a generic description as content from API might be long */}
          Dive into the world of user interfaces with our expert guides, latest trends, and practical tips.
        </p>
      </div>
      <div className="flex items-center space-x-3 text-xs text-zinc-500 pt-1">
        {/* User icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        <span className="font-medium">{post.author}</span>
        <span className="text-zinc-400">&bull;</span>
        <span>{post.readTime}</span>
      </div>
    </div>
  </Link>
);


export const HomePageUI = ({ posts }: { posts: Post[] }) => {
  const { searchQuery, setSearchQuery, isSearchVisible, hideSearch } = useSearch();

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    if (!searchQuery.trim()) return posts;
    
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  // Gracefully handle the case where there are no posts from the API.
  if (!posts || posts.length === 0) {
    return (
        <div className="text-center py-12">
            <h2 className="text-xl font-bold text-zinc-800">No posts available</h2>
            <p className="text-zinc-500 mt-2">Please check back later or add some posts to the mock API.</p>
        </div>
    );
  }

  // Assign posts to different sections of the page.
  const mainFeaturedPost = filteredPosts[0];
  const otherFeaturedPosts = filteredPosts.slice(1, 6);
  const recentPosts = filteredPosts.slice(1, 4); // Using a slice of posts for the recent section.

  return (
    <div className="py-12 md:py-16 space-y-16">
      {/* Search Bar */}
      <div className="flex justify-center">
        <SearchBarClient 
          onSearch={setSearchQuery} 
          onClose={hideSearch}
          isVisible={isSearchVisible}
        />
      </div>

      {/* Show search results count */}
      {searchQuery && (
        <div className="text-center">
          <p className="text-zinc-600">
            Found {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} for "{searchQuery}"
          </p>
        </div>
      )}

      {/* Featured Section */}
      {filteredPosts.length > 0 && (
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href={`/posts/${mainFeaturedPost.id}`} className="block group relative w-full h-[350px] rounded-xl overflow-hidden shadow-lg">
              <Image
                src={mainFeaturedPost.imageUrl}
                alt={mainFeaturedPost.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                priority // Load this image first
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                <span className="text-xs font-semibold bg-red-500/90 backdrop-blur-sm px-2 py-1 rounded-full uppercase tracking-wider">{mainFeaturedPost.category}</span>
                <h2 className="text-2xl md:text-3xl font-bold mt-3 leading-tight max-w-xl">{mainFeaturedPost.title}</h2>
              </div>
            </Link>
          </div>
          <div className="lg:col-span-1">
            
            <div className="space-y-4 border-l-2 border-zinc-100 pl-4">
              {otherFeaturedPosts.map(post => (
                <OtherFeaturedPostItem key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts Section */}
      {filteredPosts.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-zinc-900">
              {searchQuery ? 'Search Results' : 'Recent Posts'}
            </h3>
            <Link href="#" className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors flex items-center space-x-2 text-sm">
              <span>All Posts</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map(post => (
              <RecentPostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* No results message */}
      {searchQuery && filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-xl font-bold text-zinc-800">No posts found</h2>
          <p className="text-zinc-500 mt-2">Try searching with different keywords.</p>
        </div>
      )}
    </div>
  );
};
