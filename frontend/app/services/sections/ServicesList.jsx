import React from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/strapi';

const defaultServices = [
  {
    title: 'AI-Driven Analytics & Predictive Insights',
    slug: 'ai-driven-analytics-and-predictive-insights',
    image: '/uploads/blog_ai_workforce_0c08f62c7c.jpg',
    serviceCount: 4,
    description:
      'AI-Driven Analytics & Predictive Insights applies machine learning to research and behavioral data to forecast outcomes and surface patterns a manual analysis would miss — turning historical data into a forward-looking decision tool.',
    subServices: [
      { title: 'AI-Powered Text & Sentiment Analysis', anchor: 'ai-powered-text-and-sentiment-analysis' },
      { title: 'Automated Data Processing & Dashboards', anchor: 'automated-data-processing-and-dashboards' },
      { title: 'Machine-Learning Based Segmentation', anchor: 'machine-learning-based-segmentation' },
      { title: 'Predictive Market Modeling', anchor: 'predictive-market-modeling' },
    ],
  },
  {
    title: 'Business Research',
    slug: 'business-research',
    image: '/uploads/services_earth_36af66b701.jpg',
    serviceCount: 1,
    description:
      'Business Research applies rigorous research methods to strategic business questions — market entry, competitive positioning, and partnership evaluation — giving leadership teams evidence-based input for high-stakes decisions.',
    subServices: [
      { title: 'Our Engagement Models', anchor: 'our-engagement-models' },
    ],
  },
  {
    title: 'Comprehensive CX & Customer Journey Research',
    slug: 'comprehensive-cx-and-customer-journey-research',
    image: '/uploads/moments_small_b223687baa.jpg',
    serviceCount: 4,
    description:
      'Comprehensive CX & Customer Journey Research maps the full end-to-end customer experience across every touchpoint, identifying exactly where friction is costing you customers and revenue — and what to fix first.',
    subServices: [
      { title: 'CX Performance Metrics & Dashboards', anchor: 'cx-performance-metrics-and-dashboards' },
      { title: 'Customer Journey Mapping Workshops', anchor: 'customer-journey-mapping-workshops' },
      { title: 'Multi-Channel VoC (Voice of Customer) Programs', anchor: 'multi-channel-voc-voice-of-customer-programs' },
      { title: 'Pain Point Analysis & Action Planning', anchor: 'pain-point-analysis-and-action-planning' },
    ],
  },
  {
    title: 'Primary Research',
    slug: 'primary-research',
    image: '/uploads/blog_field_research_575a614208.jpg',
    serviceCount: 4,
    description:
      'Primary Research designs and fields custom studies that collect first-hand data directly from your target audience, giving decision-makers evidence built specifically around their question. Every engagement is scoped to your sample, timeline, and budget.',
    subServices: [
      { title: 'CATI Surveys', anchor: 'cati-surveys' },
      { title: 'Focus Group Discussions', anchor: 'focus-group-discussions' },
      { title: 'Online Surveys', anchor: 'online-surveys' },
      { title: 'Telephonic Surveys', anchor: 'telephonic-surveys' },
    ],
  },
  {
    title: 'Qualitative Research',
    slug: 'qualitative-research',
    image: '/uploads/moments_large_8fa260d861.jpg',
    serviceCount: 4,
    description:
      'Qualitative Research explores the why behind consumer and stakeholder behavior through in-depth interviews and discussions, surfacing language and motivations that closed-ended surveys miss. Findings typically generate hypotheses ahead of a quantitative study.',
    subServices: [
      { title: 'Focus Group Discussions', anchor: 'qualitative-research-focus-group-discussions' },
      { title: 'In-Home Usage Tests (iHUTs)', anchor: 'in-home-usage-tests-ihuts' },
      { title: 'In-depth Interviews', anchor: 'in-depth-interviews' },
      { title: 'Online Bulletin Board', anchor: 'online-bulletin-board' },
    ],
  },
  {
    title: 'Quantitative Research',
    slug: 'quantitative-research',
    image: '/uploads/industry_banking_49416162c9.jpg',
    serviceCount: 3,
    description:
      'Quantitative Research delivers statistically representative data at scale — measuring not just what people think, but how many, and by how much — so decisions can be sized, prioritized, and tracked over time with confidence.',
    subServices: [
      { title: 'Global Panel', anchor: 'global-panel' },
      { title: 'Intercept Interview', anchor: 'intercept-interview' },
      { title: 'Telephonic Interviews', anchor: 'telephonic-interviews' },
    ],
  },
  {
    title: 'Research Support Functions',
    slug: 'research-support-functions',
    image: '/uploads/industry_cityscape_f926ff60c2.jpg',
    serviceCount: 3,
    description:
      'Research Support Functions cover the operational backbone of a research program — survey programming, data processing, and verbatim coding — so your primary and quantitative studies convert into clean data faster and more accurately.',
    subServices: [
      { title: 'Data Processing and Tabulation', anchor: 'data-processing-and-tabulation' },
      { title: 'Survey Programming', anchor: 'survey-programming' },
      { title: 'Verbatim Coding & Processing', anchor: 'verbatim-coding-and-processing' },
    ],
  },
  {
    title: 'Social Media Intelligence & Sentiment Analysis',
    slug: 'social-media-intelligence-and-sentiment-analysis',
    image: '/uploads/industry_retail_9a08ec9395.jpg',
    serviceCount: 4,
    description:
      'Social Media Intelligence & Sentiment Analysis monitors what’s being said about your brand, category, and competitors across social platforms in real time — turning unstructured social chatter into a structured, trackable signal.',
    subServices: [
      { title: 'Competitor Mentions & Benchmarking', anchor: 'competitor-mentions-and-benchmarking' },
      { title: 'Industry Trend Monitoring', anchor: 'industry-trend-monitoring' },
      { title: 'Influencer Mapping & Engagement Insights', anchor: 'influencer-mapping-and-engagement-insights' },
      { title: 'Social Listening & Brand Sentiment Tracking', anchor: 'social-listening-and-brand-sentiment-tracking' },
    ],
  },
];

export default function ServicesList({ dynamicServices = null }) {
  const services = defaultServices;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-[850px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#be2c28]">ABOUT OUR SERVICES</p>
          <h2 className="mt-3 text-[28px] font-extrabold leading-[1.2] text-[#0f172a] sm:text-4xl lg:text-[44px]">
            Comprehensive Research Solutions For Smarter Business Decisions
          </h2>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-[#475569]">
            At Unimrkt Research, we provide end-to-end market research services that empower businesses with accurate data, actionable insights, and strategic intelligence. From primary data collection and qualitative research to quantitative studies, business research, and research support functions, our tailored solutions help organizations understand markets, customers, and emerging opportunities.
          </p>
          <p className="mx-auto mt-4 max-w-4xl text-base leading-7 text-[#475569]">
            Backed by experienced researchers, advanced methodologies, and global capabilities, we deliver reliable research solutions across diverse industries. Whether you&#39;re launching a new product, evaluating market opportunities, or strengthening your competitive position, Unimrkt Research provides the insights you need to make confident, data-driven decisions and achieve sustainable growth.
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item, idx) => (
            <article
              key={idx}
              className="group flex h-full flex-col overflow-hidden rounded-industry border border-card-border bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <Link
                aria-label={`Explore ${item.title}`}
                className="relative block aspect-[516/370] w-full shrink-0 bg-[#000311]"
                href={`/services/${item.slug}`}
              >
                <img
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="object-cover opacity-80 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    color: 'transparent',
                  }}
                  src={item.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" aria-hidden="true"></div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                  <h3 className="font-sans text-xl font-semibold leading-[1.2] text-white">{item.title}</h3>
                  <span className="shrink-0 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                    {item.serviceCount} Services
                  </span>
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="text-base !leading-[1.9] opacity-80 text-sm opacity-70">{item.description}</p>
                <ul className="flex flex-wrap gap-2" aria-label={`${item.title} sub-services`}>
                  {item.subServices.map((sub, sIdx) => (
                    <li key={sIdx}>
                      <Link
                        className="flex min-h-[44px] items-center rounded-full border border-card-border px-4 text-xs font-medium text-ink2 transition-colors hover:border-brand-600 hover:text-brand-600"
                        href={`/services/${item.slug}#${sub.anchor}`}
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  aria-label={`Explore ${item.title}`}
                  className="mt-auto inline-flex min-h-[44px] items-center gap-2 font-nav text-sm font-semibold text-brand-600 hover:underline"
                  href={`/services/${item.slug}`}
                >
                  Explore Service
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-3.5" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
