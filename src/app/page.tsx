import Link from 'next/link';
import { db } from '@/lib/db';
import { posts, categories } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import PostCard from '@/components/PostCard';
import AdBanner from '@/components/AdBanner';
import CategoryList from '@/components/CategoryList';

export default async function HomePage() {
  const latestPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt))
    .limit(10);

  const allCategories = await db.select().from(categories);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 mb-8 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-bengali">
          বাংলা ব্লগে স্বাগতম
        </h1>
        <p className="text-xl font-bengali">
          প্রযুক্তি, জীবনযাপন, এবং আরও অনেক বিষয়ে বাংলায় পড়ুন
        </p>
      </div>

      {/* Top Ad Banner */}
      <AdBanner position="home-top" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6 font-bengali">সাম্প্রতিক পোস্ট</h2>
          
          {latestPosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 font-bengali">কোনো পোস্ট পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="space-y-6">
              {latestPosts.map((post, index) => (
                <div key={post.id}>
                  <PostCard post={post} />
                  {/* Ad after every 3rd post */}
                  {(index + 1) % 3 === 0 && <AdBanner position="in-feed" />}
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {latestPosts.length >= 10 && (
            <div className="mt-8 text-center">
              <Link 
                href="/blog" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                আরও দেখুন
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Categories */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h3 className="text-xl font-bold mb-4 font-bengali">ক্যাটাগরি</h3>
            <CategoryList categories={allCategories} />
          </div>

          {/* Sidebar Ad */}
          <AdBanner position="sidebar" />

          {/* Popular Posts */}
          <div className="bg-white rounded-lg shadow p-6 mt-6">
            <h3 className="text-xl font-bold mb-4 font-bengali">জনপ্রিয় পোস্ট</h3>
            <div className="space-y-3">
              {latestPosts.slice(0, 5).map((post) => (
                <Link 
                  key={post.id} 
                  href={`/blog/${post.slug}`}
                  className="block hover:text-blue-600 transition-colors"
                >
                  <p className="font-medium line-clamp-2">{post.title}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ad Banner */}
      <AdBanner position="home-bottom" />
    </div>
  );
}
