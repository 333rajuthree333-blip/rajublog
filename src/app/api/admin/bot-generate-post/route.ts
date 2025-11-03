import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { posts } from '@/lib/db/schema';

const trendingTopics = [
  'AI and Machine Learning',
  'Web Development Trends',
  'Digital Marketing',
  'Remote Work Tips',
  'Health and Wellness',
  'Productivity Hacks',
  'Technology Innovations',
  'Sustainable Living',
  'Personal Finance',
  'Career Development'
];

export async function POST(request: Request) {
  try {
    // Select a random topic
    const randomTopic = trendingTopics[Math.floor(Math.random() * trendingTopics.length)];
    const timestamp = new Date().toISOString().slice(0, 10);
    const idea = `${randomTopic} - Latest Insights ${timestamp}`;

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Blog Bot Generator',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a professional blog writer. Generate engaging, SEO-friendly blog posts with proper HTML formatting.'
          },
          {
            role: 'user',
            content: `Write a unique and informative blog post about: ${idea}. Make it current, relevant, and engaging. Format with HTML tags (h2, h3, p, ul, li). Include at least 500 words.`
          }
        ],
        temperature: 0.8,
        max_tokens: 2500,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenRouter error:', data);
      return NextResponse.json({ error: 'Failed to generate post' }, { status: 500 });
    }

    const content = data.choices[0].message.content;
    
    // Generate title and excerpt
    const title = `${randomTopic}: Essential Guide for ${new Date().getFullYear()}`;
    const excerpt = `Discover the latest insights and trends in ${randomTopic}. This comprehensive guide covers everything you need to know.`;
    
    // Create slug
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '-' + Date.now();

    // Save to database
    await db.insert(posts).values({
      title,
      slug,
      content,
      excerpt,
      coverImage: `https://source.unsplash.com/1200x600/?${encodeURIComponent(randomTopic)}`,
      published: true,
      authorId: 1, // Default to first user
      views: 0,
    });

    return NextResponse.json({
      message: 'Post generated and published successfully!',
      title,
      slug,
    });
  } catch (error) {
    console.error('Bot generate post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
