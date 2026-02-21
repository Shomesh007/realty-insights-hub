import { useState } from "react";
import { Clock, User, Tag } from "lucide-react";

const blogPosts = [
  {
    title: "Why Dubai Marina Remains the Top Choice for Rental Yields in 2025",
    excerpt: "With yields consistently above 7%, Dubai Marina continues to outperform most global real estate markets. Here's what investors need to know.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop",
    category: "Market Analysis",
    author: "LykaConnect AI",
    date: "Feb 18, 2025",
    readTime: "5 min read",
  },
  {
    title: "Golden Visa Through Real Estate: A Complete Guide for Tamil Investors",
    excerpt: "Everything you need to know about obtaining UAE residency through property investment — eligibility, thresholds, and step-by-step process.",
    image: "https://images.unsplash.com/photo-1582407947092-87344e833008?w=600&h=400&fit=crop",
    category: "Visa & Residency",
    author: "Investment Team",
    date: "Feb 12, 2025",
    readTime: "8 min read",
  },
  {
    title: "Dubai South: The Hidden Gem for High-Growth Property Investment",
    excerpt: "Near Al Maktoum International Airport and Expo City, Dubai South is projected to see 11.5% annual appreciation. Our AI breaks down the data.",
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a?w=600&h=400&fit=crop",
    category: "Growth Areas",
    author: "LykaConnect AI",
    date: "Feb 5, 2025",
    readTime: "6 min read",
  },
  {
    title: "Understanding Off-Plan vs Ready Properties in Dubai",
    excerpt: "A data-driven comparison of off-plan and ready properties — ROI, risks, payment plans, and which strategy suits your investment profile.",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop",
    category: "Investment Strategy",
    author: "Investment Team",
    date: "Jan 28, 2025",
    readTime: "7 min read",
  },
  {
    title: "How AI is Revolutionizing Dubai Real Estate Valuations",
    excerpt: "From satellite imagery to transaction pattern analysis, AI models now predict property values with 98% accuracy. Here's how it works.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    category: "Technology",
    author: "LykaConnect AI",
    date: "Jan 20, 2025",
    readTime: "4 min read",
  },
  {
    title: "Top 5 Mistakes NRI Investors Make When Buying Dubai Property",
    excerpt: "From ignoring service charges to overlooking DLD fees — avoid these costly errors that impact your real estate ROI.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    category: "Tips & Guides",
    author: "Investment Team",
    date: "Jan 15, 2025",
    readTime: "5 min read",
  },
];

const BlogSection = () => {
  const [showMore, setShowMore] = useState(false);
  const displayedPosts = showMore ? blogPosts : blogPosts.slice(0, 3);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-4">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">Insights & Research</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">
          Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Market Intelligence</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Expert analysis and AI-generated insights on Dubai's real estate landscape.
        </p>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post, index) => (
          <article
            key={index}
            className="group bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-card/90 backdrop-blur-sm text-[10px] font-bold text-primary uppercase tracking-wider">
                  <Tag className="h-3 w-3" />
                  {post.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-base font-bold text-foreground mb-2 leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-[10px] text-muted-foreground font-medium uppercase tracking-wider border-t border-border pt-3">
                <div className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Show More Toggle */}
      {blogPosts.length > 3 && (
        <div className="text-center mt-8">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-border text-sm font-bold text-foreground hover:bg-muted hover:border-secondary/50 transition-all shadow-sm"
          >
            {showMore ? "Show Less" : `View ${blogPosts.length - 3} More Articles`}
          </button>
        </div>
      )}
    </section>
  );
};

export default BlogSection;
