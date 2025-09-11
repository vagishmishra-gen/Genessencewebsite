import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import BlogPostContent from './components/BlogPostContent';
import RelatedPosts from './components/RelatedPosts';
import { blogPosts, getPostBySlug, getRelatedPosts } from './data/blogData';

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = useMemo(() => getPostBySlug(slug), [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 pt-24 text-center">
          <h1 className="text-2xl font-headline-bold mb-3">Post not found</h1>
          <p className="text-muted-foreground mb-6">The article you are looking for does not exist.</p>
          <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
      </div>
    );
  }

  const related = getRelatedPosts(post, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <Breadcrumb currentPage="Blog" currentSection={post.title} />
          <div className="mb-4 text-xs font-medium px-3 py-1 rounded-full inline-block bg-primary/20 text-primary">{post.category}</div>
          <h1 className="text-3xl md:text-4xl font-headline-bold text-foreground mb-3">{post.title}</h1>
          <div className="text-sm text-muted-foreground mb-6">By {post.author?.name} • {post.readTime}</div>
          <div className="h-64 w-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" onError={(e)=>{e.currentTarget.style.display='none';}} />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <BlogPostContent content={post.content} />
        </div>
      </section>

      {/* Related */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h3 className="text-xl font-semibold mb-6">Related Articles</h3>
          <RelatedPosts posts={related} />
        </div>
      </section>
    </div>
  );
};

export default BlogPostPage;
