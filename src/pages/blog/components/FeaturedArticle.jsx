import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedArticle = ({ post }) => {
  if (!post) return null;
  return (
    <Link to={`/blog/${post.slug}`} className="block rounded-2xl overflow-hidden border border-border/60 bg-card shadow-sm hover:shadow-xl transition-shadow">
      <div className="grid md:grid-cols-5">
        {/* Image left (60%) */}
        <div className="relative md:col-span-3 h-64 md:h-full">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" onError={(e)=>{e.currentTarget.style.display='none';}} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
        {/* Content right (40%) */}
        <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center space-y-3">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
              {post.category}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-headline-bold text-foreground leading-snug">
            {post.title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
          <div className="text-xs text-muted-foreground">By {post.author?.name} • {post.readTime}</div>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedArticle;
