import ServicesHero from './sections/ServicesHero';
import ServicesAboutOverview from './sections/ServicesAboutOverview';
import EndToEndSolutions from './sections/EndToEndSolutions';
import WhyChooseUs from './sections/WhyChooseUs';
import ServicesWorkflow from './sections/ServicesWorkflow';
import ServicesQuestionCTA from './sections/ServicesQuestionCTA';
import ResearchReachSection from './sections/ResearchReachSection';
import ServicesIndustriesExpertise from '../../components/ServicesIndustriesExpertise';
import CaseStudiesImpactCta from './sections/CaseStudiesImpactCta';
import CommonTrustedPartnersTestimonials from '../../components/CommonTrustedPartnersTestimonials';
import CommonBlogSection from '../../components/CommonBlogSection';
import ServicesFaq from './sections/ServicesFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection, getServices, getTestimonials, getBlogPosts } from '../../lib/strapi';

export const metadata = {
  title: 'End-to-End Market Research Services | Unimrkt Research',
  description:
    'Comprehensive qualitative and quantitative research services, CATI telephone surveys, CAWI online panels, survey programming, data analytics, and reporting.',
  keywords: [
    'market research services',
    'qualitative research services',
    'quantitative market research',
    'CATI telephone surveys',
    'survey programming',
    'data collection services',
    'B2B market research',
    'consumer research solutions',
  ],
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'End-to-End Market Research Services | Unimrkt Research',
    description:
      'Comprehensive qualitative and quantitative research services, CATI telephone surveys, CAWI online panels, and market intelligence solutions.',
    url: 'https://www.unimrkt.com/services',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/services-hero-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Unimrkt Research Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'End-to-End Market Research Services | Unimrkt Research',
    description:
      'Comprehensive qualitative and quantitative research services, CATI telephone surveys, CAWI online panels, and market intelligence solutions.',
    images: ['/asstes/images/services-hero-banner-img.png'],
  },
};

export default async function ServicesPage() {
  const [pageData, servicesList, testimonials, blogs] = await Promise.all([
    getPageBySlug('services').catch(() => null),
    getServices(20).catch(() => []),
    getTestimonials(10).catch(() => []),
    getBlogPosts(6).catch(() => []),
  ]);

  const sections = Array.isArray(pageData?.sections) ? pageData.sections : [];

  const heroSection = findSection(pageData, 'sections.hero-common');
  const metricsSection = findSection(pageData, 'sections.metrics-grid');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  const srvWorkflowSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions' && s.heading?.includes('Workflow')
  ) || sections.find((s) => s.__component === 'sections.accordion-solutions');
  const whyChooseSection = sections.find(
    (s) => s.__component === 'sections.metrics-grid' && (s.heading?.includes('Why Choose') || s.kicker?.includes('WHY CHOOSE'))
  );

  return (
    <>
      <ServicesHero dynamicHero={heroSection} />
      <ServicesAboutOverview />
      <EndToEndSolutions initialServices={servicesList} />
      <WhyChooseUs
        items={whyChooseSection?.metrics || []}
        title={whyChooseSection?.heading}
        description={whyChooseSection?.description}
      />
      <ServicesWorkflow
        processSteps={srvWorkflowSection?.cards || []}
        heading={srvWorkflowSection?.heading}
        description={srvWorkflowSection?.description}
      />
      <ServicesQuestionCTA dynamicCta={ctaSection} />
      <ResearchReachSection
        kicker={metricsSection?.kicker || 'Our Coverage'}
        title={metricsSection?.heading || 'Research Reach That Goes Beyond Markets'}
        description={metricsSection?.description}
      />
      <ServicesIndustriesExpertise />
      <CaseStudiesImpactCta />
      <CommonTrustedPartnersTestimonials initialTestimonials={testimonials} />
      <CommonBlogSection initialBlogs={blogs} />
      <ServicesFaq dynamicFaq={faqSection} />
      <InsightsEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
