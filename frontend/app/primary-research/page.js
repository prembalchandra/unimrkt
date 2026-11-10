import PrimaryHero from './sections/PrimaryHero';
import TrustedClients from './sections/TrustedClients';
import AbouPrimaryOverview from './sections/AbouPrimaryOverview';
import PrimaryServices from './sections/PrimaryServices';
import UnimrktResearchArea from './sections/UnimrktResearchArea';
import ResearchMethodologies from './sections/ResearchMethodologies';
import IndustriesArea from './sections/IndustriesArea';
import ContactFormSection from './sections/ContactFormSection';
import CommonBlogSection from '../../components/CommonBlogSection';
import FqaPrimaryresearch from './sections/FqaPrimaryresearch';
import PrimaryresEditorialAbout from './sections/PrimaryresEditorialAbout';
import PrimaryresearchResearchCta from './sections/PrimaryresearchResearchCta';
import { getPageBySlug, findSection, getServices, getIndustries, getBlogPosts } from '../../lib/strapi';

export const metadata = {
  title: 'Primary Research Services | Qualitative & Quantitative Fieldwork',
  description:
    'Collect first-hand market intelligence through customized primary research solutions: in-depth interviews, executive recruitment, focus groups, and multi-market fieldwork.',
  keywords: [
    'primary research services',
    'qualitative fieldwork',
    'quantitative fieldwork',
    'in-depth interviews',
    'focus group discussions',
    'respondent recruitment',
    'survey fieldwork',
    'unimrkt primary research',
  ],
  alternates: {
    canonical: '/primary-research',
  },
  openGraph: {
    title: 'Primary Research Services | Unimrkt Research',
    description:
      'Customized primary research solutions that uncover customer opinions, validate business decisions, and fuel strategic growth across 90+ countries.',
    url: 'https://www.unimrkt.com/primary-research',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/uploads/unimrkt-reseach-primary-research-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Primary Research Services - Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Primary Research Services | Unimrkt Research',
    description:
      'Customized primary research solutions that uncover customer opinions, validate business decisions, and fuel strategic growth across 90+ countries.',
    images: ['/uploads/unimrkt-reseach-primary-research-banner-img.png'],
  },
};

export default async function PrimaryResearchPage() {
  const [pageData, services, industries, blogs] = await Promise.all([
    getPageBySlug('primary-research').catch(() => null),
    getServices(10).catch(() => []),
    getIndustries(12).catch(() => []),
    getBlogPosts(6).catch(() => []),
  ]);

  const sections = Array.isArray(pageData?.sections) ? pageData.sections : [];

  const heroSection = findSection(pageData, 'sections.hero-common');
  const metricsSection = findSection(pageData, 'sections.metrics-grid');
  const valuesSection = findSection(pageData, 'sections.values-grid');
  const faqSection = findSection(pageData, 'sections.faq-accordion');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  const overviewSection = sections.find((s) => s.__component === 'sections.callout-box');
  const primaryServicesSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions' && s.heading?.includes('Primary Research Services')
  );
  const indAreaSection = sections.find(
    (s) => s.__component === 'sections.accordion-solutions' && s.heading?.includes('Industries We Support')
  );
  const contactFormSection = sections.find((s) => s.__component === 'sections.contact-form');
  const editorialSection = sections.find(
    (s) => s.__component === 'sections.rich-text-block' || s.__component === 'sections.callout-box'
  );

  const methodSection = sections.find((s) => s.__component === 'sections.accordion-solutions' && !s.heading?.includes('Primary Research Services') && !s.heading?.includes('Industries We Support')) || sections.find((s) => s.__component === 'sections.accordion-solutions');
  const reachSection = sections.find((s) => s.__component === 'sections.research-reach');

  const displaySteps = methodSection?.cards || valuesSection?.values || [];
  const displayMetrics = reachSection?.cards || metricsSection?.metrics || [];

  return (
    <>
      <PrimaryHero dynamicHero={heroSection} />
      <TrustedClients />
      <AbouPrimaryOverview dynamicOverview={overviewSection} />
      <PrimaryServices initialServices={services} dynamicSection={primaryServicesSection} />
      <UnimrktResearchArea
        metrics={displayMetrics}
        kicker={reachSection?.kicker}
        heading={reachSection?.heading}
        description={reachSection?.description}
      />
      <ResearchMethodologies
        steps={displaySteps}
        heading={methodSection?.heading}
        description={methodSection?.description}
      />
      <IndustriesArea initialIndustries={industries} dynamicSection={indAreaSection} />
      <ContactFormSection dynamicForm={contactFormSection} />
      <CommonBlogSection initialBlogs={blogs} />
      <FqaPrimaryresearch dynamicFaq={faqSection} />
      <PrimaryresEditorialAbout dynamicEditorial={editorialSection} />
      <PrimaryresearchResearchCta dynamicCta={ctaSection} />
    </>
  );
}
