import { NextResponse } from 'next/server';

const MOCK_API_URL = 'https://688c7791cd9d22dda5cd3e9e.mockapi.io/api/v1/posts';

export async function GET() {
  try {
    // Fetch data from the external mock API
    const res = await fetch(MOCK_API_URL, {
      // Revalidate data every 60 seconds
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      // If the external API call fails, throw an error
      throw new Error(`Failed to fetch from mock API: ${res.statusText}`);
    }

    const posts = await res.json();
    
    // Transform the data to match our Post interface
    const transformedPosts = posts.map((post: any) => ({
      ...post,
      author: post.name, // Map 'name' to 'author' to match our interface
    }));

    return NextResponse.json(transformedPosts);

  } catch (error) {
    console.error('[API_POSTS_GET]', error);
    // Return an internal server error response
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
