import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-xl sm:text-2xl font-bold hover:text-purple-200 transition">
              Fairy Tales
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-purple-200 transition text-sm lg:text-base">
              Home
            </Link>
            <Link href="/list" className="hover:text-purple-200 transition text-sm lg:text-base">
              All Fairy Tales
            </Link>
            <Link href="/random" className="hover:text-purple-200 transition text-sm lg:text-base">
              Random Tale
            </Link>
            <Link href="/admin" className="bg-yellow-400 text-gray-800 px-3 py-2 lg:px-4 lg:py-2 rounded-lg font-semibold hover:bg-yellow-300 transition text-sm lg:text-base">
              Admin Panel
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-purple-200 focus:outline-none focus:text-purple-200"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 0 1 1.414 1.414l-4.828 4.829 4.828 4.828z"/>
                ) : (
                  <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-purple-700 rounded-lg mt-2">
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium hover:text-purple-200 hover:bg-purple-800 rounded-md transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/list"
                className="block px-3 py-2 text-base font-medium hover:text-purple-200 hover:bg-purple-800 rounded-md transition"
                onClick={() => setIsMenuOpen(false)}
              >
                All Fairy Tales
              </Link>
              <Link
                href="/random"
                className="block px-3 py-2 text-base font-medium hover:text-purple-200 hover:bg-purple-800 rounded-md transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Random Tale
              </Link>
              <Link
                href="/admin"
                className="block px-3 py-2 text-base font-medium bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}