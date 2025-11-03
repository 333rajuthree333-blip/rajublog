import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, Eye } from 'lucide-react';
import { format } from 'date-fns';

interface PostCardProps {
  post: any;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {post.coverImage && (
        <Link href={`/blog/${post.slug}`}>
          <div className="relative h-48 md:h-64 w-full overflow-hidden rounded-t-lg">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
      )}
      
      <div className="p-6">
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>
        
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        )}
        
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{format(new Date(post.createdAt), 'dd MMM yyyy')}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{post.views} views</span>
          </div>
        </div>
        
        <div className="mt-4">
          <Link 
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            আরও পড়ুন →
          </Link>
        </div>
      </div>
    </article>
  );
}
