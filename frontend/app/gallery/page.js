import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import React from 'react';
import GalleryHero from './sections/GalleryHero';
import GalleryGrid from './sections/GalleryGrid';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, getGalleryItems, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'gallery',
    'Moments & Culture Gallery | Life Inside Unimrkt Research',
    'A visual glimpse into life at Unimrkt Research: collaborative workshops, milestone celebrations, fieldwork expeditions, and our vibrant global corporate culture.'
  );
}

export default async function GalleryPage() {
  const [pageData, galleryItems] = await Promise.all([
    getPageBySlug('gallery').catch(() => null),
    getGalleryItems(30).catch(() => []),
  ]);

  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ gallery: galleryItems, pageData }} />
      </main>
    );
  }

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <GalleryHero dynamicHero={heroSection} />
      <GalleryGrid initialGallery={galleryItems} />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
