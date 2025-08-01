import { notFound } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import { Post } from '@/components/PostCard';

const getBaseUrl = () => {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

// This function tells Next.js which dynamic routes to pre-render at build time.
export async function generateStaticParams() {
  const apiUrl = 'https://688c7791cd9d22dda5cd3e9e.mockapi.io/api/v1/posts';
  
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) return [];
    const posts = await res.json();
    
    // Transform the data to match our Post interface
    const transformedPosts = posts.map((post: any) => ({
      ...post,
      author: post.name, // Map 'name' to 'author' to match our interface
    }));
 
    return transformedPosts.map((post: Post) => ({
      id: post.id,
    }));
  } catch (error) {
    console.error("Fetching posts for static params failed:", error);
    return [];
  }
}

// This function fetches a single post using the external API.
async function getPost(id: string): Promise<Post | null> {
  const apiUrl = `https://688c7791cd9d22dda5cd3e9e.mockapi.io/api/v1/posts/${id}`;
  
  try {
    const res = await fetch(apiUrl, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      // If the post is not found, getPost will return null.
      return null;
    }
    
    const post = await res.json();
    
    // Transform the data to match our Post interface
    const transformedPost = {
      ...post,
      author: post.name, // Map 'name' to 'author' to match our interface
    };
    
    return transformedPost;
  } catch (error) {
    console.error("Fetching post failed:", error);
    return null;
  }
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  return {
    title: `${post.title} | Beyond UI`,
    description: post.content?.substring(0, 150) || 'Read this amazing article.',
  }
}


export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    // This will render the not-found.tsx page if you have one, or a default 404.
    notFound();
  }

  return (
    <>
      <Header />
      <article className="max-w-4xl mx-auto py-12 bg-white">
        <div className="text-center mb-12">
            <span className="text-red-500 font-semibold">{post.category}</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 mt-4 leading-tight">{post.title}</h1>
            <div className="text-zinc-500 text-sm mt-6 flex items-center justify-center space-x-4">
                <span>By {post.author}</span>
                <span>&bull;</span>
                <span>{post.date}</span>
                <span>&bull;</span>
                <span>{post.readTime}</span>
            </div>
        </div>

        <div className="relative w-full h-96 rounded-2xl overflow-hidden mb-12">
            <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
            />
        </div>

        <div className="prose prose-lg max-w-none prose-zinc prose-a:text-red-500 hover:prose-a:text-red-600">
            <p>{post.content}</p>
        </div>
      </article>
    </>
  );
}