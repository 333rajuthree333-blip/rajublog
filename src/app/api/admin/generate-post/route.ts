import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { idea } = await request.json();

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'Blog AI Generator',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.2-3b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a professional blog writer. Generate engaging, SEO-friendly blog posts with proper HTML formatting. Return JSON with title, excerpt, and content fields.'
          },
          {
            role: 'user',
            content: `Write a blog post about: ${idea}. Return as JSON with fields: title (string), excerpt (string, 150-200 chars), content (HTML formatted blog post with h2, h3, p, ul, li tags). Make it informative and engaging.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenRouter error:', data);
      return NextResponse.json({ error: 'Failed to generate post' }, { status: 500 });
    }

    // Parse the AI response
    let blogData;
    try {
      const content = data.choices[0].message.content;
      // Try to parse as JSON first
      blogData = JSON.parse(content);
    } catch (e) {
      // If not valid JSON, create a structured response
      const content = data.choices[0].message.content;
      blogData = {
        title: idea,
        excerpt: content.substring(0, 200) + '...',
        content: content
      };
    }

    return NextResponse.json({
      title: blogData.title || idea,
      excerpt: blogData.excerpt || '',
      content: blogData.content || '',
      coverImage: `https://source.unsplash.com/1200x600/?${encodeURIComponent(idea.split(' ')[0])}`,
    });
  } catch (error) {
    console.error('Generate post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
