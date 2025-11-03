import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { newsletters } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await db.select().from(newsletters).where(eq(newsletters.email, email)).limit(1);
    
    if (existing.length > 0) {
      if (existing[0].isActive) {
        return NextResponse.json({ error: 'Already subscribed!' }, { status: 400 });
      } else {
        // Reactivate subscription
        await db.update(newsletters)
          .set({ isActive: true, name: name || existing[0].name })
          .where(eq(newsletters.email, email));
        
        return NextResponse.json({ message: 'Subscription reactivated!' });
      }
    }

    // Add new subscription
    await db.insert(newsletters).values({
      email,
      name,
      isActive: true,
    });

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
