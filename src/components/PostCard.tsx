import Link from 'next/link';
import Image from 'next/image';

export interface Post {
  id: string;
  category: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  content?: string;
  createdAt?: string; // Add createdAt for compatibility
  excerpt?: string; // Add excerpt for compatibility
}

const PostCard = ({ post, isFeatured = false }: { post: Post, isFeatured?: boolean }) => {
  if (isFeatured) {
    return (
      <Link href={`/posts/${post.id}`} className="block group col-span-1 md:col-span-2">
        <div className="relative bg-zinc-100 rounded-2xl overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-0 left-0 p-6 md:p-8 bg-white to-transparent w-full">
            <span className="text-white text-sm font-semibold bg-red-500 px-3 py-1 rounded-full">{post.category}</span>
            <h2 className="text-white text-2xl md:text-4xl font-bold mt-4 leading-tight">{post.title}</h2>
            <div className="text-zinc-300 text-sm mt-4 flex items-center space-x-4">
              <span>By {post.author}</span>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/posts/${post.id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
        <div className="overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-6">
          <span className="text-red-500 text-xs font-semibold">{post.category}</span>
          <h3 className="text-lg font-bold mt-2 text-zinc-900 group-hover:text-red-500 transition-colors">{post.title}</h3>
          <div className="text-zinc-500 text-xs mt-3 flex items-center space-x-3">
            <span>By {post.author}</span>
            <span>&bull;</span>
            <span>{post.date}</span>
            <span>&bull;</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;