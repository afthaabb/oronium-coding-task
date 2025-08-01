// src/components/RecentPosts.tsx
'use client';

import Link from 'next/link';
import { Post } from '@/components/PostCard'; // Assuming you have a type definition for Post

interface RecentPostsProps {
  posts: Post[];
}

export default function RecentPosts({ posts }: RecentPostsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-40 object-cover"
            />
          )}
          <div className="p-4">
            <h3 className="text-xl font-bold mb-2">
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h3>
            <p className="text-gray-600 mb-2 line-clamp-2">{post.content?.substring(0, 100)}...</p>
            <div className="flex items-center text-sm text-gray-500">
              <span>{post.author}</span>
              <span className="mx-1">•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString()}
              </time>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}