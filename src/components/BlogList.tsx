"use client";

import { useState } from 'react';
import PostCard, { Post } from '@/components/PostCard';

const BlogList = ({ posts }: { posts: Post[] }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

  return (
    <div className="space-y-12">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-6 py-4 rounded-full border border-zinc-200 focus:ring-2 focus:ring-red-500 focus:outline-none transition-shadow"
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute right-6 top-1/2 -translate-y-1/2 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {featuredPost && <PostCard post={featuredPost} isFeatured />}
          <div className="space-y-8">
            {otherPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-zinc-500">No articles found. Try a different search.</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;