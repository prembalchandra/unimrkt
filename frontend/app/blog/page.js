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
        url: '/asstes/images/blog-banner-img.png',
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
    images: ['/asstes/images/blog-banner-img.png'],
  },
};

export default async function BlogPage() {
  const [strapiBlogs, pageData] = await Promise.all([
    getBlogPosts(20).catch(() => []),
    getPageBySlug('blog').catch(() => null),
  ]);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <BlogHero dynamicHero={heroSection} />
      <BlogGrid initialBlogs={strapiBlogs} />
      <CommonBlogSection />
      <BlogFaq />
      <InsightsEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
