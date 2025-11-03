'use client';

import Link from 'next/link';
import { Menu, Search, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 font-bengali">বাংলা ব্লগ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-bengali">
              হোম
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors font-bengali">
              ব্লগ
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-600 transition-colors font-bengali">
              ক্যাটাগরি
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-bengali">
              আমাদের সম্পর্কে
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-bengali">
              যোগাযোগ
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="সার্চ করুন..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-bengali"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-blue-600 py-2 font-bengali"
                onClick={() => setMobileMenuOpen(false)}
              >
                হোম
              </Link>
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-blue-600 py-2 font-bengali"
                onClick={() => setMobileMenuOpen(false)}
              >
                ব্লগ
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 hover:text-blue-600 py-2 font-bengali"
                onClick={() => setMobileMenuOpen(false)}
              >
                ক্যাটাগরি
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-blue-600 py-2 font-bengali"
                onClick={() => setMobileMenuOpen(false)}
              >
                আমাদের সম্পর্কে
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-blue-600 py-2 font-bengali"
                onClick={() => setMobileMenuOpen(false)}
              >
                যোগাযোগ
              </Link>
            </nav>
            
            {/* Mobile Search */}
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="সার্চ করুন..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-bengali"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
