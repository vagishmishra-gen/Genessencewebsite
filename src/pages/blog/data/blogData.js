export const blogPosts = [
  {
    id: 1,
    title: "The Complete Guide to AI-Powered Process Automation in 2025",
    slug: "complete-guide-ai-process-automation-2025",
    category: "AI & Automation",
    excerpt: "How enterprises achieve 300% ROI with intelligent process automation.",
    content: `# The Complete Guide to AI-Powered Process Automation in 2025\n\nThis concise guide outlines implementation pillars, pitfalls, and a quick roadmap.\n\n## Why it matters\n- 75% cycle-time reduction\n- 300% average ROI\n- 95%+ decision accuracy\n\n## Quick roadmap\n1. Map processes\n2. Prioritize high-impact use cases\n3. Build thin-slice MVPs\n4. Instrument with analytics\n5. Iterate and scale`,
    author: { name: "Dr. Sarah Chen" },
    publishDate: "2025-09-08",
    readTime: "6 min read",
    featured: true,
    image: "/assets/images/no_image.png",
    tags: ["AI", "Process Automation", "ROI"]
  },
  {
    id: 2,
    title: "Machine Learning in Financial Services: Fraud Detection",
    slug: "machine-learning-financial-fraud-detection",
    category: "Industry Insights",
    excerpt: "Modern ML detects fraud patterns in real time using behavior and graphs.",
    content: `# Fraud Detection Breakthroughs\n\nKey techniques: behavioral analytics, graph neural networks, and anomaly scoring.`,
    author: { name: "Marcus Rodriguez" },
    publishDate: "2025-09-05",
    readTime: "4 min read",
    featured: false,
    image: "/assets/images/no_image.png",
    tags: ["ML", "Finance", "Security"]
  },
  {
    id: 3,
    title: "How AI Chatbots Are Transforming Customer Service",
    slug: "ai-chatbots-transforming-customer-service",
    category: "AI & Automation",
    excerpt: "24/7 support, intent detection, and integrated workflows boost CSAT.",
    content: `# Chatbots\n\nDesign for handoff to humans, guardrails, and clear KPIs.`,
    author: { name: "Ava Patel" },
    publishDate: "2025-08-28",
    readTime: "3 min read",
    featured: false,
    image: "/assets/images/no_image.png",
    tags: ["Chatbots", "CX"]
  },
  {
    id: 4,
    title: "Predictive Analytics in Supply Chain Management",
    slug: "predictive-analytics-supply-chain",
    category: "Industry Insights",
    excerpt: "Demand sensing and ETA prediction reduce costs and stockouts.",
    content: `# Supply Chain\n\nStart with clean master data; adopt rolling forecasts.`,
    author: { name: "Liam Nguyen" },
    publishDate: "2025-08-20",
    readTime: "4 min read",
    featured: false,
    image: "/assets/images/no_image.png",
    tags: ["Supply Chain", "Forecasting"]
  },
  {
    id: 5,
    title: "The Future of Work: Human-AI Collaboration",
    slug: "future-of-work-human-ai",
    category: "Industry Insights",
    excerpt: "Outcome-driven teams leverage AI copilots for higher leverage work.",
    content: `# Collaboration\n\nDefine decision rights; audit models; measure uplift.`,
    author: { name: "Noah Kim" },
    publishDate: "2025-08-10",
    readTime: "5 min read",
    featured: false,
    image: "/assets/images/no_image.png",
    tags: ["Workforce", "Copilots"]
  },
  {
    id: 6,
    title: "Case Study: 500% Efficiency via Intelligent Document Processing",
    slug: "case-study-idp-500-efficiency",
    category: "Case Studies",
    excerpt: "IDP + validation workflows compress SLAs from days to minutes.",
    content: `# IDP Case Study\n\nUse confidence thresholds and human-in-the-loop.`,
    author: { name: "Priya Singh" },
    publishDate: "2025-08-01",
    readTime: "3 min read",
    featured: false,
    image: "/assets/images/no_image.png",
    tags: ["IDP", "SLA"]
  },
  {
    id: 7,
    title: "Building Ethical AI for Enterprise",
    slug: "building-ethical-ai-enterprise",
    category: "Technical",
    excerpt: "Governance, fairness tests, model cards, and audit trails.",
    content: `# Ethical AI\n\nStart with data minimization and risk registers.`,
    author: { name: "Elena Garcia" },
    publishDate: "2025-07-22",
    readTime: "4 min read",
    featured: false,
    image: "/assets/images/no_image.png",
    tags: ["Ethics", "Governance"]
  },
  {
    id: 8,
    title: "NLP for Business Intelligence",
    slug: "nlp-for-business-intelligence",
    category: "Technical",
    excerpt: "Query data using natural language with guardrails and caching.",
    content: `# NLP BI\n\nLeverage vector search, RLHF, and retrieval patterns.`,
    author: { name: "Arjun Mehta" },
    publishDate: "2025-07-10",
    readTime: "4 min read",
    featured: false,
    image: "/assets/images/no_image.png",
    tags: ["NLP", "Analytics"]
  },
  {
    id: 9,
    title: "Computer Vision in Quality Control",
    slug: "computer-vision-quality-control",
    category: "Technical",
    excerpt: "Defect detection with few-shot learning and on-edge inference.",
    content: `# CV QC\n\nCollect diverse defect libraries; design feedback loops.`,
    author: { name: "Mina Park" },
    publishDate: "2025-06-30",
    readTime: "3 min read",
    featured: false,
    image: "/assets/images/no_image.png",
    tags: ["Vision", "Manufacturing"]
  },
  {
    id: 10,
    title: "AI Personalization Beyond Recommenders",
    slug: "ai-personalization-beyond-recos",
    category: "AI & Automation",
    excerpt: "Context-aware journeys across channels drive measurable lift.",
    content: `# Personalization\n\nSegment by intent; score journeys; run uplift tests.`,
    author: { name: "Olivia Brooks" },
    publishDate: "2025-06-15",
    readTime: "3 min read",
    featured: false,
    image: "/assets/images/no_image.png",
    tags: ["Personalization", "Growth"]
  }
];

export const categories = [
  "All",
  "AI & Automation",
  "Industry Insights",
  "Case Studies",
  "Technical",
];

export const getPostBySlug = (slug) => blogPosts.find(p => p.slug === slug);
export const getRelatedPosts = (post, limit = 3) =>
  blogPosts.filter(p => p.id !== post.id && (p.category === post.category || p.tags.some(t => post.tags.includes(t)))).slice(0, limit);
