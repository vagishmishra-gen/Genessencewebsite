import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const BlogCard = ({ post }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-border shadow-sm hover:shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e)=>{e.currentTarget.style.display='none';}}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 space-y-3">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
            {post.category}
          </span>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>

        <h3 className="text-lg md:text-xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-2">
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
