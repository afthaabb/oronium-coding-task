// src/app/page.tsx
import Header from '@/components/Header';
import { HomePageUI } from '@/components/HomePageUI';
import { Post } from '@/components/PostCard';

// This server-side function fetches all posts.
async function getPosts(): Promise<Post[]> {
  const apiUrl = 'https://688c7791cd9d22dda5cd3e9e.mockapi.io/api/v1/posts';
  
  try {
    const res = await fetch(apiUrl, { 
      // Revalidate the data every 60 seconds to keep it fresh.
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
      // If the response is not OK, log the status and throw an error.
      console.error(`API Error: ${res.status} ${res.statusText}`);
      throw new Error('Failed to fetch posts');
    }

    const posts = await res.json();
    
    // Transform the data to match our Post interface
    const transformedPosts = posts.map((post: any) => ({
      ...post,
      author: post.name, // Map 'name' to 'author' to match our interface
    }));

    return transformedPosts;
  } catch (error) {
    console.error("Fetching posts failed:", error);
    // Return an empty array on failure to prevent the page from crashing.
    return [];
  }
}

export default async function Home() {
  // Fetch data on the server.
  const posts = await getPosts();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <HomePageUI posts={posts} />
      </main>
    </>
  );
}
