import Link from 'next/link';
import { Facebook, Twitter, Youtube, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-bengali">আমাদের সম্পর্কে</h3>
            <p className="text-gray-400 font-bengali">
              বাংলায় প্রযুক্তি, জীবনযাপন এবং শিক্ষামূলক কন্টেন্ট শেয়ার করার জন্য আমাদের ব্লগ
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-bengali">দ্রুত লিংক</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors font-bengali">
                  প্রাইভেসি পলিসি
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors font-bengali">
                  শর্তাবলী
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-400 hover:text-white transition-colors font-bengali">
                  সাইটম্যাপ
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="text-gray-400 hover:text-white transition-colors font-bengali">
                  বিজ্ঞাপন দিন
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-bengali">ক্যাটাগরি</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/technology" className="text-gray-400 hover:text-white transition-colors font-bengali">
                  প্রযুক্তি
                </Link>
              </li>
              <li>
                <Link href="/categories/lifestyle" className="text-gray-400 hover:text-white transition-colors font-bengali">
                  লাইফস্টাইল
                </Link>
              </li>
              <li>
                <Link href="/categories/education" className="text-gray-400 hover:text-white transition-colors font-bengali">
                  শিক্ষা
                </Link>
              </li>
              <li>
                <Link href="/categories/business" className="text-gray-400 hover:text-white transition-colors font-bengali">
                  ব্যবসা
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-bengali">সোশ্যাল মিডিয়া</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="font-bold mb-2 font-bengali">নিউজলেটার</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="ইমেইল এড্রেস"
                  className="bg-gray-800 text-white px-4 py-2 rounded-l-lg flex-grow focus:outline-none font-bengali"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg transition-colors font-bengali">
                  সাবস্ক্রাইব
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="font-bengali">© 2024 বাংলা ব্লগ। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}
