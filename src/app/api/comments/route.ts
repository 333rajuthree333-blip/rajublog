import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { comments } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }

    const postComments = await db
      .select()
      .from(comments)
      .where(and(eq(comments.postId, parseInt(postId)), eq(comments.approved, true)))
      .orderBy(comments.createdAt);

    return NextResponse.json({ comments: postComments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, authorName, authorEmail, content } = body;

    if (!postId || !authorName || !authorEmail || !content) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    await db.insert(comments).values({
      postId: parseInt(postId),
      authorName,
      authorEmail,
      content,
      approved: false,
    });

    return NextResponse.json(
      { message: 'Comment submitted for review' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting comment:', error);
    return NextResponse.json(
      { error: 'Failed to submit comment' },
      { status: 500 }
    );
  }
}
