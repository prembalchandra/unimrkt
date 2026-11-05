'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/strapi';

const defaultBlogs = [
  {
    title: 'Key Trends Shaping the Future of the Automotive Industry',
    slug: 'key-trends-shaping-the-future-of-the-automotive-industry',
    category: 'Primary Research',
    image: '/uploads/blog_grid_business_203c769c3f.jpg',
    excerpt:
      'The automotive industry is undergoing one of the most significant transformations in its history, driven by electrification, autonomous technology, and shifting consumer expectations.',
  },
  {
    title: 'How Market Research Strengthens Scenario Planning and Strategic Decision-Making',
    slug: 'how-market-research-strengthens-scenario-planning-and-strategic-decision-making',
    category: 'Qualitative Research',
    image: '/uploads/blog_grid_scenario_677965ab26.jpg',
    excerpt:
      'Economic cycles, competitive pressure, regulatory shifts, and evolving customer expectations all place unpredictable demands on modern businesses.',
  },
  {
    title: 'What Does a Business Research Company Do? Role, Services, and Impact',
    slug: 'what-does-a-business-research-company-do-role-services-and-impact',
    category: 'Quantitative Research',
    image: '/uploads/blog_grid_lifecycle_ed1f51a0dc.jpg',
    excerpt:
      'Whether it is a startup validating a new business model or an enterprise entering a new market, structured research plays a decisive role.',
  },
  {
    title: 'How the Selection of Quantitative Research Method Shapes the Quality of Business Insights',
    slug: 'how-the-selection-of-quantitative-research-method-shapes-the-quality-of-business-insights',
    category: 'Market Intelligence',
    image: '/uploads/blog_grid_quant2_f112d2d794.jpg',
    excerpt:
      'Most businesses today have access to more data than ever before, yet the quality of the insight depends entirely on the method used to gather it.',
  },
  {
    title: 'The Anatomy of a High-Converting Survey: Mapping Questions to the Buyer’s Journey',
    slug: 'the-anatomy-of-a-high-converting-survey-mapping-questions-to-the-buyer-s-journey',
    category: 'Survey Design',
    image: '/uploads/blog_grid_survey_269347ab64.jpg',
    excerpt:
      'Survey-driven decision-making remains a foundational tool for understanding customer sentiment and predicting behavior.',
  },
];

export default function CommonBlogSection({ blogs = [] }) {
  const scrollRef = useRef(null);

  const list = blogs?.length > 0 ? blogs : defaultBlogs;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <p className="font-nav text-[13px] font-semibold uppercase tracking-wider text-heading">
            Latest Blogs
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous post"
              className="flex size-[45px] items-center justify-center rounded-full border border-ink2/20 text-ink2 transition-colors hover:bg-ink2/5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4 rotate-180"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"></circle>
                <path
                  d="M9.5 8.5L13 12l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next post"
              className="flex size-[45px] items-center justify-center rounded-full border border-ink2/20 text-ink2 transition-colors hover:bg-ink2/5"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-4"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5"></circle>
                <path
                  d="M9.5 8.5L13 12l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <Link
            className="flex shrink-0 flex-col justify-between gap-10 rounded-blog bg-gradient-to-br from-gradient-from to-gradient-to p-8 text-white shadow-blog lg:w-[320px] transition-transform duration-300 hover:scale-[1.02]"
            href="/blogs"
          >
            <h3 className="font-nav text-4xl font-semibold leading-[1.2] tracking-[-1px]">
              Exploring <br />
              Market Trends
            </h3>
            <p className="font-sans text-sm leading-[1.4] text-white/90">
              Discover Emerging Market Trends That Shape Smarter Business Decisions.
            </p>
          </Link>

          <ul
            ref={scrollRef}
            className="flex flex-1 snap-x snap-mandatory gap-8 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {list.map((item, idx) => {
              const title = item.title;
              const slug = item.slug || item.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              const image = getStrapiMediaUrl(
                item.featuredImage || item.image,
                defaultBlogs[idx % defaultBlogs.length].image
              );
              const excerpt =
                item.excerpt || item.description || defaultBlogs[idx % defaultBlogs.length].excerpt;
              const rawCategory = item.category || defaultBlogs[idx % defaultBlogs.length].category;
              const categoryName = typeof rawCategory === 'object' ? (rawCategory?.name || rawCategory?.title || '') : String(rawCategory || '');

              return (
                <li key={idx} className="w-72 shrink-0 snap-start sm:w-80">
                  <Link
                    href={`/blogs/${slug}`}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-blog border border-card-border bg-white shadow-blog transition-transform duration-200 hover:-translate-y-1"
                  >
                    <div className="relative m-4 aspect-[469/260] shrink-0 overflow-hidden rounded-2xl bg-slate-100 mb-0">
                      <img
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                        src={image}
                      />
                      {categoryName && (
                        <span className="absolute bottom-3 left-3 rounded-md bg-black/60 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                          {categoryName}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        <h4 className="font-nav text-lg font-semibold leading-[1.3] text-heading transition-colors group-hover:text-brand-600 line-clamp-2">
                          {title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-heading/70 line-clamp-2">
                          {excerpt}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                        <span className="font-sans text-xs font-semibold uppercase tracking-wider text-brand-600">
                          Read More
                        </span>
                        <span className="flex size-7 items-center justify-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="size-3.5"
                          >
                            <path
                              d="M7 17L17 7M17 7H9M17 7v8"
                              stroke="currentColor"
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
