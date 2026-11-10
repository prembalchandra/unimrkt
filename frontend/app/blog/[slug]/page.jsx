import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getBlogPostBySlug,
  getRelatedBlogs,
  getStrapiMedia,
  getPageBySlug,
  findSection,
} from '@/lib/strapi';
import StrapiBlocksRenderer from '@/components/StrapiBlocksRenderer';
import ResearchCta from '@/app/blog/sections/ResearchCta';
import BlogDetailClientActions from './BlogDetailClientActions';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getBlogPostBySlug(slug).catch(() => null);

  if (!blog) {
    return {
      title: 'Article Not Found | Unimrkt Research',
      description: 'The requested market research article could not be found.',
    };
  }

  const title = blog.seo?.metaTitle || `${blog.title} | Unimrkt Blog`;
  const description =
    blog.seo?.metaDescription ||
    blog.excerpt ||
    'In-depth market research insights and perspectives from Unimrkt Research.';
  const keywords = blog.seo?.keywords
    ? blog.seo.keywords.split(',').map((k) => k.trim())
    : blog.tags
      ? blog.tags.split(',').map((k) => k.trim())
      : ['market research', 'industry intelligence', 'unimrkt insights'];

  const imageUrl = getStrapiMedia(
    blog.seo?.shareImage || blog.featuredImage,
    '/asstes/images/blog-banner-img.png'
  );
  const canonicalUrl = `https://www.unimrkt.com/blog/${slug}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Unimrkt Research',
      locale: 'en_US',
      type: 'article',
      publishedTime: blog.publishedDate || blog.publishedAt,
      modifiedTime: blog.updatedAt,
      authors: [blog.authorName || blog.author?.name || 'Unimrkt Research Team'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function DynamicBlogDetailPage({ params }) {
  const { slug } = await params;
  const [blog, pageData] = await Promise.all([
    getBlogPostBySlug(slug).catch(() => null),
    getPageBySlug('blog-details').catch(() => null),
  ]);

  if (!blog) {
    notFound();
  }

  const categoryName = blog.category?.name || 'Market Research';
  const authorName = blog.authorName || blog.author?.name || 'Unimrkt Intelligence Team';
  const authorRole = blog.authorRole || blog.author?.role || 'Global Research Practice';
  const authorImage = getStrapiMedia(
    blog.author?.photo,
    '/asstes/images/team/john-doe.png'
  );

  const formattedDate = blog.publishedDate || blog.publishedAt
    ? new Date(blog.publishedDate || blog.publishedAt).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : 'Recent';

  const readTime = blog.readTime || '6 min read';
  const viewsCount = blog.viewsCount || '3.5K views';
  const heroImageUrl = getStrapiMedia(
    blog.featuredImage,
    '/asstes/images/market-trends-card-img1.png'
  );

  const tagsList = blog.tags
    ? blog.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : ['Market Research', 'Industry Analysis', 'Strategy'];

  const relatedBlogs = await getRelatedBlogs(slug, blog.category?.id, 3).catch(() => []);
  const ctaSection = findSection(pageData, 'sections.question-cta');

  // JSON-LD Structured Data for Google Article
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt,
    image: [heroImageUrl],
    datePublished: blog.publishedDate || blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    author: {
      '@type': 'Person',
      name: authorName,
      jobTitle: authorRole,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Unimrkt Research',
      url: 'https://www.unimrkt.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.unimrkt.com/asstes/images/unimrkt-resarch-logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.unimrkt.com/blog/${slug}`,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Breadcrumb Navigation */}
      <section className="blog-breadcrumb-section" style={{ background: '#f8fafc', padding: '16px 0', borderBottom: '1px solid #e2e8f0' }}>
        <div className="srcn-container">
          <nav aria-label="Breadcrumb" className="team-breadcrumb" style={{ fontSize: '0.9rem', color: '#64748b' }}>
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <Link href="/blog" style={{ color: '#64748b', textDecoration: 'none' }}>Blog</Link>
            <span style={{ margin: '0 8px' }}>›</span>
            <span style={{ color: '#0f172a', fontWeight: '500' }}>{blog.title}</span>
          </nav>
        </div>
      </section>

      {/* Main Blog Article Layout */}
      <section className="blog-detail-section" style={{ padding: '60px 0' }}>
        <div className="srcn-container">
          <div className="blog-detail-layout">
            <article className="blog-detail-article">
              <header className="blog-detail-header">
                <span className="blog-detail-category">
                  {categoryName} <span aria-hidden="true">•</span> Insight Brief
                </span>
                <h1 style={{ fontSize: '2.5rem', lineHeight: '1.25', margin: '16px 0', color: '#0f172a' }}>
                  {blog.title}
                </h1>
                <p className="blog-detail-deck" style={{ fontSize: '1.2rem', color: '#475569', lineHeight: '1.6', marginBottom: '24px' }}>
                  {blog.excerpt}
                </p>

                {/* Author & Meta Bar */}
                <div className="blog-detail-meta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={authorImage}
                      alt={authorName}
                      style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <strong style={{ display: 'block', fontSize: '0.95rem', color: '#0f172a' }}>{authorName}</strong>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{authorRole}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.9rem', color: '#64748b' }}>
                    <span>
                      <i className="fa-regular fa-calendar" aria-hidden="true" style={{ marginRight: '6px' }}></i>
                      {formattedDate}
                    </span>
                    <span>
                      <i className="fa-regular fa-clock" aria-hidden="true" style={{ marginRight: '6px' }}></i>
                      {readTime}
                    </span>
                    <span>
                      <i className="fa-regular fa-eye" aria-hidden="true" style={{ marginRight: '6px' }}></i>
                      {viewsCount}
                    </span>
                    <BlogDetailClientActions title={blog.title} />
                  </div>
                </div>
              </header>

              {/* Featured / Hero Image */}
              <figure className="blog-detail-hero-image" style={{ margin: '36px 0', borderRadius: '12px', overflow: 'hidden' }}>
                <img
                  src={heroImageUrl}
                  alt={blog.title}
                  style={{ width: '100%', maxHeight: '520px', objectFit: 'cover' }}
                />
              </figure>

              {/* Rich Text Body Content */}
              <div className="blog-detail-body">
                <StrapiBlocksRenderer content={blog.content} />

                {/* Callout Box Component */}
                <aside className="blog-detail-callout" style={{ margin: '48px 0', padding: '32px', background: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid var(--brand-primary, #b91c1c)' }}>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', color: '#0f172a' }}>
                    Turn Research Questions Into Strategic Clarity
                  </h3>
                  <p style={{ color: '#475569', marginBottom: '20px', lineHeight: '1.6' }}>
                    Unimrkt Research provides global primary fieldwork, CATI interviewing, and data analytics across 90+ markets. Connect with our practice leads to discuss custom intelligence programs.
                  </p>
                  <Link href="/contact" className="blog-detail-cta btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    Connect with an Expert <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                  </Link>
                </aside>

                {/* Article Tags */}
                {tagsList.length > 0 && (
                  <div className="blog-detail-tags" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '36px', paddingTop: '24px', borderTop: '1px solid #e2e8f0' }}>
                    <span style={{ fontWeight: '600', color: '#0f172a' }}>Topics:</span>
                    {tagsList.map((tag, idx) => (
                      <Link
                        key={idx}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        style={{ padding: '6px 14px', background: '#f1f5f9', borderRadius: '20px', fontSize: '0.85rem', color: '#475569', textDecoration: 'none' }}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>

            {/* Sidebar with Quick Enquiry & Recent Articles */}
            <aside className="blog-detail-sidebar" aria-label="Sidebar">
              {/* Quick Inquiry Card */}
              <section className="blog-sidebar-card blog-enquiry-card">
                <h2>Quick Inquiry</h2>
                <p className="blog-enquiry-subtitle">Connect with our market research specialists</p>
                <BlogDetailClientActions isForm={true} sourcePage={`blog-${slug}`} />
              </section>

              {/* Related Articles Card */}
              {relatedBlogs.length > 0 && (
                <section className="blog-sidebar-card blog-recent-posts" style={{ marginTop: '32px' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '20px', color: '#0f172a' }}>
                    Related Articles
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {relatedBlogs.map((item) => (
                      <Link
                        key={item.id}
                        href={`/blog/${item.slug}`}
                        style={{ display: 'flex', gap: '14px', textDecoration: 'none', color: 'inherit' }}
                      >
                        <img
                          src={getStrapiMedia(item.featuredImage, '/asstes/images/market-trends-card-img1.png')}
                          alt={item.title}
                          style={{ width: '84px', height: '64px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                        />
                        <div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--brand-primary, #b91c1c)', textTransform: 'uppercase', fontWeight: '600' }}>
                            {item.category?.name || 'Insights'}
                          </span>
                          <h4 style={{ fontSize: '0.9rem', lineHeight: '1.4', margin: '4px 0', color: '#0f172a' }}>
                            {item.title}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Related Blogs Carousel / Showcase */}
      {relatedBlogs.length > 0 && (
        <section className="related-blogs-section" style={{ background: '#f8fafc', padding: '60px 0' }}>
          <div className="srcn-container">
            <div className="section-header-area" style={{ marginBottom: '36px' }}>
              <span className="career-values-kicker">MORE FROM UNIMRKT</span>
              <h2 className="section-main-heading">Explore Related Market Perspectives</h2>
            </div>
            <div className="case-study-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              {relatedBlogs.map((b) => (
                <Link key={b.id} href={`/blog/${b.slug}`} className="blog-col-box" style={{ textDecoration: 'none' }}>
                  <div className="blog-wapper">
                    <div className="blog-img-area">
                      <img
                        src={getStrapiMedia(b.featuredImage, '/asstes/images/market-trends-card-img1.png')}
                        alt={b.title}
                      />
                    </div>
                    <div className="blog-contnet">
                      <div className="blog-category-tag-box">
                        <span className="badge-tag">{b.category?.name || 'Insights'}</span>
                      </div>
                      <div className="blog-contnt-row-area">
                        <h3>{b.title}</h3>
                        <p>{b.excerpt}</p>
                      </div>
                      <div className="blog-card-bottom-action">
                        <span className="blog-read-arrow-circle">
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global CTA Section */}
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
