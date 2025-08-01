"use client"
import React from 'react';

// Type definitions
interface IconProps {
  path: string;
  className?: string;
}

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  imageUrl: string;
}

interface RecentPostCardProps {
  post: Post;
}

// Helper component for SVG icons to avoid repetition
const Icon: React.FC<IconProps> = ({ path, className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d={path} />
  </svg>
);

// Header component
const Header: React.FC = () => (
  <header className="py-6 px-4 sm:px-6 lg:px-8 bg-[#121212] text-white">
    <div className="container mx-auto flex justify-between items-center">
      <h1 className="text-2xl font-bold">Beyond</h1>
      <nav className="hidden md:flex items-center space-x-8">
        <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
        <a href="#" className="text-purple-400 font-semibold">Blog</a>
        <a href="#" className="hover:text-purple-400 transition-colors">About</a>
        <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
      </nav>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-gray-800 transition-colors">
            <Icon path="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" className="w-5 h-5" />
        </button>
        <button className="hidden md:block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-colors">
          Get in touch
        </button>
         <button className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors">
            <Icon path="M4 6h16M4 12h16M4 18h16" className="w-6 h-6" />
        </button>
      </div>
    </div>
  </header>
);

// Featured Post component
const FeaturedPost: React.FC = () => (
    <div className="bg-[#1C1C1C] rounded-3xl p-6 md:p-8 flex flex-col">
        <div className="relative mb-6">
            <img 
                src="https://placehold.co/800x500/1C1C1C/FFFFFF?text=Featured+Post" 
                alt="Featured post" 
                className="w-full h-auto rounded-2xl object-cover aspect-[16/10]"
                onError={(e) => (e.target as HTMLImageElement).src='https://placehold.co/800x500/1C1C1C/FFFFFF?text=Image+Error'}
            />
            <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-bold py-1 px-3 rounded-full">FEATURED</span>
        </div>
        <div className="flex-grow flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Balancing Creativity and Business in Design
            </h2>
            <p className="text-gray-400 mb-6 flex-grow">
                Discover the delicate art of harmonizing artistic vision with commercial demands. This post explores practical strategies for designers to thrive creatively while meeting business goals, ensuring projects are both inspiring and profitable.
            </p>
            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                    <img 
                        src="https://i.pravatar.cc/40?u=a042581f4e29026704d" 
                        alt="Author" 
                        className="w-10 h-10 rounded-full"
                        onError={(e) => (e.target as HTMLImageElement).src='https://placehold.co/40x40/7F00FF/FFFFFF?text=A'}
                    />
                    <div>
                        <p className="font-semibold text-white">John Doe</p>
                        <p className="text-gray-500">25 July 2024</p>
                    </div>
                </div>
                <a href="#" className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                    <span>Read More</span>
                    <Icon path="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H5a1,1,0,0,0,0,2h9.59l-3.3,3.29a1,1,0,1,0,1.42,1.42l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z" className="w-5 h-5" />
                </a>
            </div>
        </div>
    </div>
);


// Recent Post Card component
const RecentPostCard: React.FC<RecentPostCardProps> = ({ post }) => (
    <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-800/50 transition-colors duration-300 group">
        <img 
            src={post.imageUrl}
            alt={post.title} 
            className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
            onError={(e) => (e.target as HTMLImageElement).src=`https://placehold.co/96x96/1C1C1C/FFFFFF?text=Img`}
        />
        <div className="flex-grow">
            <h3 className="font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{post.title}</h3>
            <div className="flex items-center text-xs text-gray-500 space-x-2">
                <span>{post.author}</span>
                <span>&bull;</span>
                <span>{post.date}</span>
            </div>
        </div>
    </div>
);

// Main App component
export default function App() {
  const recentPosts: Post[] = [
    {
      id: 1,
      title: "The Psychology of Color in UI/UX Design",
      author: "Jane Smith",
      date: "24 July 2024",
      imageUrl: "https://placehold.co/96x96/7F00FF/FFFFFF?text=UI/UX"
    },
    {
      id: 2,
      title: "10 Essential Figma Plugins for Designers",
      author: "Mike Johnson",
      date: "23 July 2024",
      imageUrl: "https://placehold.co/96x96/4A00E0/FFFFFF?text=Figma"
    },
    {
      id: 3,
      title: "Creating Accessible and Inclusive Web Designs",
      author: "Emily White",
      date: "22 July 2024",
      imageUrl: "https://placehold.co/96x96/8E2DE2/FFFFFF?text=A11y"
    },
    {
      id: 4,
      title: "Navigating the Future of AI in Creative Fields",
      author: "Chris Green",
      date: "21 July 2024",
      imageUrl: "https://placehold.co/96x96/6A1B9A/FFFFFF?text=AI"
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212] font-sans text-gray-300">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Post Section (takes 2 columns on large screens) */}
          <div className="lg:col-span-2">
            <FeaturedPost />
          </div>

          {/* Recent Posts Section (takes 1 column on large screens) */}
          <div className="bg-[#1C1C1C] rounded-3xl p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Recent Post</h2>
              <a href="#" className="text-purple-400 hover:text-purple-300 text-sm font-semibold">See all</a>
            </div>
            <div className="space-y-2">
              {recentPosts.map(post => <RecentPostCard key={post.id} post={post} />)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}