import { db } from '@/lib/db';
import { posts, categories } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import PostCard from '@/components/PostCard';
import AdBanner from '@/components/AdBanner';
import CategoryList from '@/components/CategoryList';

export default async function BlogPage() {
  const allPosts = await db
    .select()
    .from(posts)
    .where(eq(posts.published, true))
    .orderBy(desc(posts.createdAt));

  const allCategories = await db.select().from(categories);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 font-bengali">সকল ব্লগ পোস্ট</h1>
      
      {/* Top Ad */}
      <AdBanner position="blog-top" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Posts */}
        <div className="lg:col-span-2">
          {allPosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 font-bengali">কোনো পোস্ট পাওয়া যায়নি</p>
            </div>
          ) : (
            <div className="space-y-6">
              {allPosts.map((post, index) => (
                <div key={post.id}>
                  <PostCard post={post} />
                  {/* Ad after every 3 posts */}
                  {(index + 1) % 3 === 0 && <AdBanner position="in-feed" />}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            {/* Categories */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h3 className="text-xl font-bold mb-4 font-bengali">ক্যাটাগরি</h3>
              <CategoryList categories={allCategories} />
            </div>
            
            {/* Sidebar Ad */}
            <AdBanner position="sidebar" />
          </div>
        </div>
      </div>
    </div>
  );
}
