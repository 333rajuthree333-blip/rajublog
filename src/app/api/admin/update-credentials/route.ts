import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { admin } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    
    // Verify the token
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'secret');
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Get the first admin (there should only be one)
    const admins = await db.select().from(admin).limit(1);
    
    if (admins.length === 0) {
      // Create new admin if none exists
      await db.insert(admin).values({
        username,
        password: hashedPassword,
      });
    } else {
      // Update existing admin
      await db.update(admin)
        .set({
          username,
          password: hashedPassword,
          updatedAt: new Date(),
        })
        .where(eq(admin.id, admins[0].id));
    }

    return NextResponse.json({ message: 'Credentials updated successfully' });
  } catch (error) {
    console.error('Update credentials error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
