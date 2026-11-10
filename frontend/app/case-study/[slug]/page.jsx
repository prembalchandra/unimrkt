import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  getPageBySlug,
  getFaqs,
  getStrapiMedia,
  findSection,
} from '@/lib/strapi';

import CaseDetailHero from '@/app/case-study-details/sections/CaseDetailHero';
import CaseDetailChallenge from '@/app/case-study-details/sections/CaseDetailChallenge';
import CaseDetailResearchQuestion from '@/app/case-study-details/sections/CaseDetailResearchQuestion';
import CaseDetailApproach from '@/app/case-study-details/sections/CaseDetailApproach';
import CaseDetailImpact from '@/app/case-study-details/sections/CaseDetailImpact';
import CaseDetailFaq from '@/app/case-study-details/sections/CaseDetailFaq';
import ResearchCta from '@/app/case-study-details/sections/ResearchCta';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug).catch(() => null);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Unimrkt Research',
      description: 'The requested market research case study could not be found.',
    };
  }

  const title = caseStudy.seo?.metaTitle || `${caseStudy.title} | Unimrkt Case Study`;
  const description =
    caseStudy.seo?.metaDescription ||
    caseStudy.excerpt ||
    'Comprehensive market research case study and strategic intelligence by Unimrkt Research.';
  const keywords = caseStudy.seo?.keywords
    ? caseStudy.seo.keywords.split(',').map((k) => k.trim())
    : [
        'market research case study',
        'customer intelligence',
        caseStudy.industry?.title || 'industry insights',
        'strategic research',
      ];

  const imageUrl = getStrapiMedia(
    caseStudy.seo?.shareImage || caseStudy.heroImage,
    '/asstes/images/case-study-banking.jpg'
  );
  const canonicalUrl = `https://www.unimrkt.com/case-study/${slug}`;

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
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
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

export default async function DynamicCaseStudyPage({ params }) {
  const { slug } = await params;

  const [caseStudy, pageData, faqs] = await Promise.all([
    getCaseStudyBySlug(slug).catch(() => null),
    getPageBySlug('case-study-details').catch(() => null),
    getFaqs().catch(() => []),
  ]);

  if (!caseStudy) {
    notFound();
  }

  const relatedStudies = await getRelatedCaseStudies(
    slug,
    caseStudy.industry?.id || null,
    2
  ).catch(() => []);

  const ctaSection = findSection(pageData, 'sections.question-cta');
  const heroImageUrl = getStrapiMedia(
    caseStudy.heroImage,
    '/asstes/images/case-study-banking.jpg'
  );

  // JSON-LD Structured Data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.excerpt,
    image: [heroImageUrl],
    datePublished: caseStudy.publishedDate || caseStudy.publishedAt,
    dateModified: caseStudy.updatedAt || caseStudy.publishedAt,
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
      '@id': `https://www.unimrkt.com/case-study/${slug}`,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <CaseDetailHero
        title={caseStudy.title}
        kicker={caseStudy.industry?.title || 'CASE STUDY'}
        description={caseStudy.excerpt}
        heroImage={caseStudy.heroImage}
        clientName={caseStudy.clientName}
      />

      {/* Challenge Section */}
      <CaseDetailChallenge
        kicker={caseStudy.challengeKicker}
        heading={caseStudy.challengeTitle}
        description={caseStudy.challengeDescription}
        subtitle={caseStudy.challengeSubtitle}
        bullets={caseStudy.challengeBullets}
        summary={caseStudy.challengeSummary}
        image={caseStudy.challengeImage}
      />

      {/* Research Question & Pillars Section */}
      <CaseDetailResearchQuestion
        kicker={caseStudy.researchQuestionKicker}
        heading={caseStudy.researchQuestionTitle}
        description={caseStudy.researchQuestionDescription}
        pillars={caseStudy.researchPillars}
      />

      {/* Our Approach Section */}
      <CaseDetailApproach
        kicker={caseStudy.approachEyebrow}
        heading={caseStudy.approachTitle}
        description={caseStudy.approachDescription}
        approachSteps={caseStudy.approachSteps}
      />

      {/* Impact Section */}
      <CaseDetailImpact
        kicker={caseStudy.impactKicker}
        heading={caseStudy.impactTitle}
        description={caseStudy.impactDescription}
        impacts={caseStudy.impactCards}
      />

      {/* Client Testimonial (if available) */}
      {caseStudy.testimonialQuote && (
        <section
          className="cs-detail-testimonial-section"
          style={{
            background: 'linear-gradient(135deg, #0b132b 0%, #1c2541 100%)',
            padding: '70px 0',
            color: '#ffffff',
          }}
        >
          <div className="srcn-container">
            <div
              style={{
                maxWidth: '920px',
                margin: '0 auto',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontSize: '3rem',
                  lineHeight: '1',
                  color: 'var(--brand-primary, #b91c1c)',
                  marginBottom: '20px',
                }}
              >
                <i className="fa-solid fa-quote-left" aria-hidden="true"></i>
              </div>
              <blockquote
                style={{
                  fontSize: '1.35rem',
                  lineHeight: '1.7',
                  fontStyle: 'italic',
                  color: '#e2e8f0',
                  margin: '0 0 28px 0',
                  fontWeight: '300',
                }}
              >
                &ldquo;{caseStudy.testimonialQuote}&rdquo;
              </blockquote>
              <div style={{ marginTop: '20px' }}>
                {caseStudy.testimonialAuthor && (
                  <strong
                    style={{
                      display: 'block',
                      fontSize: '1.1rem',
                      color: '#ffffff',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {caseStudy.testimonialAuthor}
                  </strong>
                )}
                {caseStudy.testimonialRole && (
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.9rem',
                      color: '#94a3b8',
                      marginTop: '4px',
                    }}
                  >
                    {caseStudy.testimonialRole}
                  </span>
                )}
                {caseStudy.clientName && (
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '10px',
                      padding: '4px 14px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '20px',
                      fontSize: '0.8rem',
                      color: '#cbd5e1',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {caseStudy.clientName}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <CaseDetailFaq faqs={faqs.slice(0, 6)} />

      {/* Related Case Studies */}
      {relatedStudies.length > 0 && (
        <section
          className="related-case-studies-section"
          style={{ background: '#f8fafc', padding: '70px 0' }}
        >
          <div className="srcn-container">
            <div className="section-header-area" style={{ marginBottom: '40px', textAlign: 'center' }}>
              <span className="career-values-kicker">MORE RESEARCH STORIES</span>
              <h2 className="section-main-heading">Explore Related Client Case Studies</h2>
            </div>
            <div
              className="case-study-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                gap: '28px',
              }}
            >
              {relatedStudies.map((item) => (
                <Link
                  key={item.id}
                  href={`/case-study/${item.slug}`}
                  className="case-study-card"
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    background: '#ffffff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <div style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
                    <img
                      src={getStrapiMedia(
                        item.heroImage,
                        '/asstes/images/case-study-banking.jpg'
                      )}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div style={{ padding: '24px' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: '700',
                        color: 'var(--brand-primary, #b91c1c)',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        marginBottom: '8px',
                      }}
                    >
                      {item.industry?.title || 'Case Study'}
                    </span>
                    <h3
                      style={{
                        fontSize: '1.2rem',
                        lineHeight: '1.4',
                        color: '#0f172a',
                        margin: '0 0 12px 0',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '0.9rem',
                        color: '#64748b',
                        lineHeight: '1.6',
                        margin: '0 0 16px 0',
                      }}
                    >
                      {item.excerpt}
                    </p>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--brand-primary, #b91c1c)',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                      }}
                    >
                      Read Case Study{' '}
                      <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global CTA */}
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
