import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { posts, users, comments } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { format } from 'date-fns';
import { Calendar, User, Eye, MessageCircle } from 'lucide-react';
import AdBanner from '@/components/AdBanner';
import CommentSection from '@/components/CommentSection';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const allPosts = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.published, true));

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      excerpt: posts.excerpt,
      coverImage: posts.coverImage,
      views: posts.views,
      createdAt: posts.createdAt,
      authorName: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.authorId, users.id))
    .where(eq(posts.slug, params.slug))
    .limit(1);

  if (!post || post.length === 0) {
    notFound();
  }

  const postData = post[0];

  // Update view count
  await db
    .update(posts)
    .set({ views: postData.views + 1 })
    .where(eq(posts.id, postData.id));

  // Get comments
  const postComments = await db
    .select()
    .from(comments)
    .where(eq(comments.postId, postData.id))
    .where(eq(comments.approved, true))
    .orderBy(desc(comments.createdAt));

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {/* Cover Image */}
        {postData.coverImage && (
          <div className="relative h-96 mb-8 rounded-lg overflow-hidden">
            <img 
              src={postData.coverImage} 
              alt={postData.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{postData.title}</h1>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 text-gray-600 mb-8">
          <div className="flex items-center gap-2">
            <User size={18} />
            <span>{postData.authorName || 'Admin'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{format(new Date(postData.createdAt), 'dd MMM yyyy')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={18} />
            <span>{postData.views} views</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle size={18} />
            <span>{postComments.length} comments</span>
          </div>
        </div>

        {/* Top Ad */}
        <AdBanner position="post-top" />

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-8">
          <ReactMarkdown>{postData.content}</ReactMarkdown>
        </div>

        {/* Bottom Ad */}
        <AdBanner position="post-bottom" />

        {/* Comments Section */}
        <CommentSection postId={postData.id} comments={postComments} />
      </article>

      {/* Related Posts Sidebar Ad */}
      <div className="max-w-4xl mx-auto mt-8">
        <AdBanner position="related-posts" />
      </div>
    </div>
  );
}
