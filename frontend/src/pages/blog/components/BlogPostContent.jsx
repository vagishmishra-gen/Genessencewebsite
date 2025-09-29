import React from 'react';

const mdToElements = (content) => {
  // Very light MD rendering: headings and paragraphs only, safe for our short samples
  return content.split('\n').map((line, idx) => {
    if (line.startsWith('# ')) return <h1 key={idx} className="text-3xl font-headline-bold mt-8 mb-4">{line.slice(2)}</h1>;
    if (line.startsWith('## ')) return <h2 key={idx} className="text-2xl font-semibold mt-6 mb-3">{line.slice(3)}</h2>;
    if (line.startsWith('```')) return <pre key={idx} className="bg-muted/40 rounded-lg p-4 text-sm overflow-auto"><code>Code block</code></pre>;
    if (line.trim() === '') return <div key={idx} className="h-3"/>;
    return <p key={idx} className="leading-7 text-foreground/90 mb-3">{line}</p>;
  });
};

const BlogPostContent = ({ content }) => {
  return (
    <article className="prose prose-invert:prose-headings:text-foreground max-w-none">
      {mdToElements(content || '')}
    </article>
  );
};

export default BlogPostContent;
