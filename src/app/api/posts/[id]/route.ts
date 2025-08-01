import { NextResponse } from 'next/server';

const MOCK_API_URL = 'https://688c7791cd9d22dda5cd3e9e.mockapi.io/api/v1/posts';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    // Fetch a single post by its ID from the mock API
    const res = await fetch(`${MOCK_API_URL}/${id}`);

    if (!res.ok) {
      // If the post is not found or another error occurs
      return new NextResponse('Post not found', { status: 404 });
    }

    const post = await res.json();
    
    // Transform the data to match our Post interface
    const transformedPost = {
      ...post,
      author: post.name, // Map 'name' to 'author' to match our interface
    };

    return NextResponse.json(transformedPost);

  } catch (error) {
    console.error('[API_POST_ID_GET]', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}