'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AddPost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') || 'manual';
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [aiIdea, setAiIdea] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/raju');
    }
  }, [router]);

  const generateAIPost = async () => {
    if (!aiIdea.trim()) {
      setMessage('Please enter a blog post idea');
      return;
    }

    setIsGenerating(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/admin/generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ idea: aiIdea }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setTitle(data.title);
        setContent(data.content);
        setExcerpt(data.excerpt);
        setCoverImage(data.coverImage || '');
        setIsReviewing(true);
        setMessage('AI post generated! Please review before accepting.');
      } else {
        setMessage(data.error || 'Failed to generate post');
      }
    } catch (error) {
      setMessage('Error generating post');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          coverImage,
          published: true,
        }),
      });

      if (response.ok) {
        router.push('/raju/dashboard');
      } else {
        setMessage('Failed to save post');
      }
    } catch (error) {
      setMessage('Error saving post');
    }
  };

  const handleBotGenerate = async () => {
    setIsGenerating(true);
    setMessage('Bot is generating a post automatically...');
    
    try {
      const response = await fetch('/api/admin/bot-generate-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Post generated and published successfully!');
        setTimeout(() => router.push('/raju/dashboard'), 2000);
      } else {
        setMessage(data.error || 'Failed to generate post');
      }
    } catch (error) {
      setMessage('Error generating post');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">
              {mode === 'ai' ? 'Add Post with AI' : mode === 'bot' ? 'Bot Auto Generate' : 'Add Post Manually'}
            </h1>
            <button
              onClick={() => router.push('/raju/dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Dashboard
            </button>
          </div>

          {message && (
            <div className={`mb-4 p-4 rounded ${message.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
              {message}
            </div>
          )}

          {mode === 'bot' && (
            <div className="text-center py-12">
              <p className="mb-6 text-gray-600">
                The bot will automatically generate a unique blog post based on trending topics and publish it.
              </p>
              <button
                onClick={handleBotGenerate}
                disabled={isGenerating}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-lg"
              >
                {isGenerating ? 'Generating...' : 'Generate and Publish Post'}
              </button>
            </div>
          )}

          {mode === 'ai' && (
            <div>
              {!isReviewing ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter your blog post idea
                  </label>
                  <textarea
                    value={aiIdea}
                    onChange={(e) => setAiIdea(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={4}
                    placeholder="E.g., Write a blog post about the benefits of meditation for mental health..."
                  />
                  <button
                    onClick={generateAIPost}
                    disabled={isGenerating || !aiIdea.trim()}
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                  >
                    {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                    <textarea
                      value={excerpt}
                      onChange={(e) => setExcerpt(e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                    <input
                      type="text"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      rows={15}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Accept and Publish
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsReviewing(false);
                        setTitle('');
                        setContent('');
                        setExcerpt('');
                        setCoverImage('');
                      }}
                      className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                    >
                      Regenerate
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {mode === 'manual' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Excerpt</label>
                <textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  rows={15}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              >
                Publish Post
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
