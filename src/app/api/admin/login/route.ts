import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '@/lib/db';
import { admin } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Check if admin exists
    const adminUser = await db.select().from(admin).where(eq(admin.username, username)).limit(1);

    if (adminUser.length === 0) {
      // If no admin exists and it's the first login with default credentials
      if (username === 'a' && password === 'a') {
        // Create default admin
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.insert(admin).values({
          username,
          password: hashedPassword,
        });
        
        // Generate token
        const token = jwt.sign(
          { username, id: 1 },
          process.env.JWT_SECRET || 'secret',
          { expiresIn: '24h' }
        );

        return NextResponse.json({ token, message: 'Default admin created and logged in' });
      }
      
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, adminUser[0].password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate token
    const token = jwt.sign(
      { username: adminUser[0].username, id: adminUser[0].id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
