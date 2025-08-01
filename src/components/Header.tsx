import Link from 'next/link';

const Header = () => {
  return (
    <header className="py-6 bg-white border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-bold text-black">
          Beyond
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#" className="text-black hover:text-gray-600 transition-colors">Home</Link>
          <Link href="#" className="text-black hover:text-gray-600 transition-colors">Blog</Link>
          <Link href="#" className="text-black hover:text-gray-600 transition-colors">About Us</Link>
          <Link href="#" className="text-black hover:text-gray-600 transition-colors">Contact Us</Link>
        </nav>
        <button className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors">
          Subscribe
        </button>
      </div>
    </header>
  );
};

export default Header;
