import React from 'react';
import { notFound } from 'next/navigation';
import { getPageBySlug, getStrapiMedia } from '../../lib/strapi';
import DynamicSectionRenderer from '../../components/DynamicSectionRenderer';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug).catch(() => null);

  if (!page) {
    return {
      title: 'Page Not Found | Unimrkt Research',
      robots: { index: false, follow: false },
    };
  }

  const seo = page.seo || {};
  const metaTitle = seo.metaTitle || page.title || 'Unimrkt Research';
  const metaDescription = seo.metaDescription || 'Global market research and insights provider.';
  const canonicalUrl = seo.canonicalURL || `https://www.unimrkt.com/${slug}`;
  const ogImageUrl = getStrapiMedia(seo.metaImage, getStrapiMedia('/uploads/unimrkt-resarch-map-banner-img.png'));

  return {
    title: `${metaTitle} | Unimrkt Research`,
    description: metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalUrl,
      images: [{ url: ogImageUrl }],
    },
  };
}

export default async function DynamicCMSPage({ params }) {
  const { slug } = await params;
  const page = await getPageBySlug(slug).catch(() => null);

  if (!page) {
    notFound();
  }

  return (
    <main className="dynamic-cms-page">
      <DynamicSectionRenderer sections={page.sections} />
    </main>
  );
}
