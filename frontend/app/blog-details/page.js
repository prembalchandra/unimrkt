import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import React from 'react';
import BlogDetailBreadcrumb from './sections/BlogDetailBreadcrumb';
import BlogDetailContent from './sections/BlogDetailContent';
import ResearchCta from '../blog/sections/ResearchCta';
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'blog-details',
    'Key Trends Shaping the Future of the Automotive Industry | Unimrkt Blog',
    'Explore the key trends reshaping the automotive industry, from electrification and software-defined vehicles to connected experiences and sustainability.'
  );
}

export default async function BlogDetailsPage() {
  const pageData = await getPageBySlug('blog-details').catch(() => null);

  
  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ pageData }} />
      </main>
    );
  }

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <BlogDetailBreadcrumb />
      <BlogDetailContent dynamicHero={heroSection} />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
