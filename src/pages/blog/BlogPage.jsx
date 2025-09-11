import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import FeaturedArticle from './components/FeaturedArticle';
import BlogCard from './components/BlogCard';
import NewsletterSubscription from './components/NewsletterSubscription';
import { blogPosts, categories } from './data/blogData';

const BlogPage = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const featured = useMemo(() => blogPosts.find(p => p.featured), []);

  const suggestions = useMemo(() => {
    const tagCounts = {};
    blogPosts.forEach(p => p.tags.forEach(t => { tagCounts[t] = (tagCounts[t]||0)+1; }));
    return Object.keys(tagCounts).sort((a,b)=>tagCounts[b]-tagCounts[a]).slice(0,6);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter(p => {
      const inCat = category === 'All' || p.category === category;
      if (!q) return inCat;
      const text = [p.title, p.excerpt, p.content, p.author?.name, ...(p.tags||[])].join(' ').toLowerCase();
      return inCat && text.includes(q);
    });
  }, [query, category]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <Breadcrumb currentPage="Blog" />
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            AI Insights & Industry Updates
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Practical guidance, case studies, and technical deep-dives from our team.
          </p>
          <div className="max-w-2xl mx-auto">
            <SearchBar value={query} onChange={setQuery} suggestions={suggestions} />
          </div>
          <div className="flex justify-center">
            <CategoryFilter categories={categories} active={category} onChange={setCategory} />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <FeaturedArticle post={featured} />
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center text-muted-foreground py-20">No results found.</div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {opacity: 0}, show: {opacity: 1, transition: {staggerChildren: 0.05}} }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
            >
              {filtered.map((p) => (
                <motion.div key={p.id} variants={{ hidden:{opacity:0, y:10}, show:{opacity:1, y:0} }}>
                  <BlogCard post={p} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <NewsletterSubscription />
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
