import React from 'react';
import BlogHero from './sections/BlogHero';
import BlogGrid from './sections/BlogGrid';
import CommonBlogSection from '../../components/CommonBlogSection';
import BlogFaq from './sections/BlogFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getBlogPosts, getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Market Research Insights, Trends & Analysis | Unimrkt Blog',
  description:
    'Explore expert market research insights, B2B intelligence, consumer behaviour trends, primary research methodologies, and industry analysis from Unimrkt Research.',
  keywords: [
    'market research blog',
    'B2B research trends',
    'consumer behavior insights',
    'qualitative research articles',
    'quantitative research methodologies',
    'market intelligence blog',
    'industry analysis',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Market Research Insights, Trends & Analysis | Unimrkt Blog',
    description:
      'Explore the latest market research insights, B2B intelligence, consumer behaviour trends, and industry analysis from Unimrkt Research.',
    url: 'https://www.unimrkt.com/blog',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/uploads/blog-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Unimrkt Research Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Market Research Insights, Trends & Analysis | Unimrkt Blog',
    description:
      'Explore the latest market research insights, B2B intelligence, consumer behaviour trends, and industry analysis from Unimrkt Research.',
    images: ['/uploads/blog-banner-img.png'],
  },
};

export default async function BlogPage() {
  const [strapiBlogs, pageData] = await Promise.all([
    getBlogPosts(30).catch(() => []),
    getPageBySlug('blog').catch(() => null),
  ]);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const ctaSection = findSection(pageData, 'sections.question-cta');
  const gridSection = pageData?.sections?.find((s) => s.__component === 'sections.callout-box');
  const editorialSection = pageData?.sections?.find(
    (s) => s.__component === 'sections.rich-text-block' || s.__component === 'sections.callout-box'
  );

  return (
    <main>
      <BlogHero dynamicHero={heroSection} />
      <BlogGrid initialBlogs={strapiBlogs} dynamicSection={gridSection} />
      <CommonBlogSection initialBlogs={strapiBlogs} />
      <BlogFaq dynamicFaq={faqSection} />
      <InsightsEditorial
        kicker={editorialSection?.kicker}
        title={editorialSection?.heading || editorialSection?.title}
        paragraph1={editorialSection?.description}
      />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
