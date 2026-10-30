import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import React from 'react';
import BlogHero from './sections/BlogHero';
import BlogGrid from './sections/BlogGrid';
import CommonBlogSection from '../../components/CommonBlogSection';
import BlogFaq from './sections/BlogFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getBlogPosts, getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'blog',
    'Market Research Insights, Trends & Analysis | Unimrkt Blog',
    'Stay informed with expert analysis, industry whitepapers, research methodology innovations, and emerging market trends from the Unimrkt Research thought leaders.'
  );
}

export default async function BlogPage() {
  const [strapiBlogs, pageData] = await Promise.all([
    getBlogPosts(20).catch(() => []),
    getPageBySlug('blog').catch(() => null),
  ]);

  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ blogs: strapiBlogs, pageData }} />
      </main>
    );
  }

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
