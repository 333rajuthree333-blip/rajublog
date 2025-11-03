import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { media } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export async function GET(request: Request) {
  try {
    const mediaFiles = await db
      .select()
      .from(media)
      .orderBy(desc(media.createdAt));

    return NextResponse.json({ media: mediaFiles });
  } catch (error) {
    console.error('Media fetch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
