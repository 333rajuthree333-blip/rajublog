'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { MessageCircle } from 'lucide-react';

interface Comment {
  id: number;
  authorName: string;
  content: string;
  createdAt: Date;
}

interface CommentSectionProps {
  postId: number;
  comments: Comment[];
}

export default function CommentSection({ postId, comments }: CommentSectionProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          authorName: name,
          authorEmail: email,
          content: comment,
        }),
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setComment('');
        alert('আপনার মন্তব্য পর্যালোচনার জন্য জমা দেওয়া হয়েছে!');
      } else {
        alert('মন্তব্য জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      }
    } catch (error) {
      alert('মন্তব্য জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <MessageCircle />
        <span className="font-bengali">মন্তব্য ({comments.length})</span>
      </h2>

      {/* Comment Form */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 font-bengali">একটি মন্তব্য করুন</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-bengali">নাম *</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-bengali">ইমেইল *</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block mb-1 font-bengali">মন্তব্য *</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 font-bengali"
          >
            {submitting ? 'জমা দেওয়া হচ্ছে...' : 'মন্তব্য জমা দিন'}
          </button>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8 font-bengali">এখনও কোনো মন্তব্য নেই। প্রথম মন্তব্য করুন!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-lg">{comment.authorName}</h4>
                <span className="text-sm text-gray-500">
                  {format(new Date(comment.createdAt), 'dd MMM yyyy, hh:mm a')}
                </span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
