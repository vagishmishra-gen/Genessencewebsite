import React from 'react';
import { Link } from 'react-router-dom';

const RelatedPosts = ({ posts }) => {
  if (!posts?.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((p) => (
        <Link key={p.id} to={`/blog/${p.slug}`} className="block p-4 border border-border rounded-xl hover:border-primary/40 transition-colors">
          <div className="text-xs mb-2 text-muted-foreground">{p.category}</div>
          <h4 className="text-foreground font-semibold mb-2">{p.title}</h4>
          <p className="text-sm text-muted-foreground" style={{display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden'}}>{p.excerpt}</p>
        </Link>
      ))}
    </div>
  );
};

export default RelatedPosts;
