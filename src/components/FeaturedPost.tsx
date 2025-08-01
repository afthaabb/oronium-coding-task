// src/components/FeaturedPost.tsx
'use client';

import Link from 'next/link';
import {Post} from '@/components/PostCard';



interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-md">
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <p className="text-sm uppercase font-bold mb-2">{post.category}</p>
          <h2 className="text-2xl font-bold mb-4 line-clamp-2">{post.title}</h2>
          <Link href={`/posts/${post.id}`} className="text-blue-500 hover:underline">
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
}