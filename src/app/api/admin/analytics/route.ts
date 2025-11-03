import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts, comments, newsletters, analytics } from '@/lib/db/schema';
import { desc, count, sql } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7days';

    // Get total counts
    const totalPosts = await db.select({ count: count() }).from(posts);
    const totalComments = await db.select({ count: count() }).from(comments);
    const totalNewsletters = await db.select({ count: count() }).from(newsletters);
    
    // Calculate total views from posts
    const viewsResult = await db.select({ 
      total: sql<number>`COALESCE(SUM(${posts.views}), 0)` 
    }).from(posts);

    // Get top 5 most viewed posts
    const topPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        views: posts.views,
      })
      .from(posts)
      .orderBy(desc(posts.views))
      .limit(5);

    // Get recent activity
    const recentPosts = await db
      .select({
        type: sql<string>`'post'`,
        description: sql<string>`CONCAT('New post: ', ${posts.title})`,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .orderBy(desc(posts.createdAt))
      .limit(3);

    const recentComments = await db
      .select({
        type: sql<string>`'comment'`,
        description: sql<string>`CONCAT('New comment by ', ${comments.authorName})`,
        createdAt: comments.createdAt,
      })
      .from(comments)
      .orderBy(desc(comments.createdAt))
      .limit(3);

    const recentSubscribers = await db
      .select({
        type: sql<string>`'newsletter'`,
        description: sql<string>`CONCAT('New subscriber: ', ${newsletters.email})`,
        createdAt: newsletters.subscribedAt,
      })
      .from(newsletters)
      .orderBy(desc(newsletters.subscribedAt))
      .limit(2);

    // Combine and sort recent activity
    const recentActivity = [...recentPosts, ...recentComments, ...recentSubscribers]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 8);

    // Mock monthly stats (you can implement actual monthly aggregation)
    const monthlyStats = [
      { month: 'Jan', posts: 12, views: 3400 },
      { month: 'Feb', posts: 15, views: 4200 },
      { month: 'Mar', posts: 18, views: 5100 },
      { month: 'Apr', posts: 22, views: 6300 },
      { month: 'May', posts: 20, views: 5800 },
      { month: 'Jun', posts: 25, views: 7200 },
    ];

    return NextResponse.json({
      totalPosts: totalPosts[0]?.count || 0,
      totalViews: Number(viewsResult[0]?.total) || 0,
      totalComments: totalComments[0]?.count || 0,
      totalNewsletters: totalNewsletters[0]?.count || 0,
      topPosts,
      recentActivity,
      monthlyStats,
    });
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
