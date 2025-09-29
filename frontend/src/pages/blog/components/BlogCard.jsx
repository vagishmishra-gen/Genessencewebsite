import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BlogCard = ({ post }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative overflow-hidden rounded-lg bg-card border border-primary/30 hover:border-primary/40 cursor-pointer shadow-md md:shadow-lg hover:shadow-lg md:hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] hover:bg-muted/30"
    >
      <div className="relative aspect-[16/10] overflow-hidden mb-4">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e)=>{e.currentTarget.style.display='none';}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4 md:p-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>

        <h3 className="mt-3 mb-3 text-lg md:text-xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-muted-foreground">
            By {post.author?.name}
          </span>
          <Icon name="ChevronRight" size={16} className="text-muted-foreground/60 group-hover:text-primary transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
