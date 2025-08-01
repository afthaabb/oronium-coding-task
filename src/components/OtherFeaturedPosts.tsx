// src/components/OtherFeaturedPosts.tsx
'use client';

import Link from 'next/link';
import { Post } from '@/components/PostCard';

interface OtherFeaturedPostsProps {
  posts: Post[];
}

export default function OtherFeaturedPosts({ posts }: OtherFeaturedPostsProps) {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Other featured posts</h3>
      <ul className="space-y-4">
        {posts.slice(1).map((post) => (
          <li key={post.id} className="flex items-start space-x-4">
            <img
              src={post.imageUrl || '/default-image.jpg'}
              alt={post.title}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <Link href={`/posts/${post.id}`} className="text-lg font-medium hover:underline">
                {post.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}