'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { getStrapiMediaUrl } from '@/lib/strapi';

const defaultBlogs = [
  {
    title: 'All You Need to Know About Online Market Research',
    slug: 'all-you-need-to-know-about-online-market-research',
    image: '/uploads/blog_photo_f2f5b0de06.jpg',
    excerpt: 'In a world where consumer behavior evolves faster than a trending topic, online market research has become essential.',
  },
  {
    title: 'Why Field-Based Quantitative Market Research Remains Critical in 2026',
    slug: 'why-field-based-quantitative-market-research-remains-critical-in-2026',
    image: '/uploads/blog_field_research_575a614208.jpg',
    excerpt: 'Over the past few years, the research landscape has shifted rapidly.',
  },
  {
    title: 'AI and the Workforce in 2026: Transformation, Disruption, or Both?',
    slug: 'ai-and-the-workforce-in-2026-transformation-disruption-or-both',
    image: '/uploads/blog_ai_workforce_0c08f62c7c.jpg',
    excerpt: 'In 2026, artificial intelligence is no longer an emerging tool.',
  },
];

export default function HomeBlogSection({ blogs = [] }) {
  const scrollRef = useRef(null);
  const list = blogs && blogs.length > 0 ? blogs : defaultBlogs;

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -350 : 350;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-white text-slate-900 lg:[container-type:inline-size]">
      <div className="relative flex flex-col gap-8 pb-12 lg:block lg:pb-0 lg:h-[38.7895cqw]">
        {/* Burgundy Left Block */}
        <div
          className="relative overflow-hidden bg-gradient-to-r from-gradient-from to-gradient-to px-6 py-10 text-white sm:px-10 lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:h-[var(--h)] lg:w-[var(--w)] lg:p-0"
          style={{
            '--l': '0.0000cqw',
            '--t': '0.0000cqw',
            '--w': '45.3158cqw',
            '--h': '24.3158cqw',
          }}
        >
          <img
            src="/figma-home/services-gradient-wallpaper.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div
            className="relative lg:absolute lg:left-[var(--l)] lg:top-[var(--t)]"
            style={{
              '--l': '7.8947cqw',
              '--t': '7.6316cqw',
            }}
          >
            <p
              className="font-nav font-semibold leading-[1.1] text-white lg:text-[length:var(--fs)] text-[18px]"
              style={{
                '--fs': 'max(13px, 0.9474cqw)',
              }}
            >
              Latest Blogs
            </p>
            <h2
              className="mt-2 font-nav text-4xl font-semibold !leading-[1.2] tracking-[-0.0192em] lg:text-[length:var(--fs)] lg:mt-[0.65cqw]"
              style={{
                '--fs': 'clamp(24px, 2.7368cqw, 48px)',
              }}
            >
              Exploring <br className="max-sm:hidden" />
              Market Trends
            </h2>
          </div>

          {/* Arrows */}
          <div
            className="relative mt-8 flex gap-[10px] lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:mt-0"
            style={{
              '--l': '7.8947cqw',
              '--t': '16.9474cqw',
            }}
          >
            <button
              type="button"
              onClick={() => scroll('left')}
              aria-label="Previous post"
              className="flex size-[45px] items-center justify-center rounded-full bg-[#853449] transition-transform hover:scale-105"
            >
              <span
                className="block size-[18px] bg-white [mask-image:url(/figma-home/arrow-mask.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
                aria-hidden="true"
              ></span>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              aria-label="Next post"
              className="flex size-[45px] items-center justify-center rounded-full bg-[#853449] transition-transform hover:scale-105"
            >
              <span
                className="block size-[18px] bg-white [mask-image:url(/figma-home/arrow-mask.png)] [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain] -scale-x-100"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </div>

        {/* Horizontal Blog Cards Slider */}
        <ul
          ref={scrollRef}
          className="relative flex snap-x snap-mandatory gap-[34px] overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] sm:px-6 lg:absolute lg:left-[var(--l)] lg:right-0 lg:top-[var(--t)] lg:gap-[1.7895cqw] lg:p-0 [&::-webkit-scrollbar]:hidden"
          style={{
            '--l': '29.6316cqw',
            '--t': '6.3158cqw',
          }}
        >
          {list.map((item, idx) => {
            const fallback = defaultBlogs[idx % defaultBlogs.length];
            const title = item.title || fallback.title;
            const slug = item.slug || fallback.slug;
            const image = getStrapiMediaUrl(item.featuredImage || item.image, fallback.image);
            const excerpt = item.excerpt || item.description || fallback.excerpt;

            return (
              <li key={idx} className="w-72 shrink-0 snap-start lg:w-[25.8947cqw]">
                <Link
                  href={`/blogs/${slug}`}
                  className="block h-full rounded-blog border border-card-border bg-white p-[26px] pt-[29px] shadow-blog lg:aspect-[492/510] lg:rounded-[1.2632cqw] lg:p-[1.3684cqw] lg:pt-[1.5263cqw] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="relative aspect-[440/291] overflow-hidden rounded-[24px] bg-slate-100 lg:rounded-[1.2632cqw]">
                    <img
                      alt={title}
                      loading="eager"
                      className="object-cover"
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
                  </div>
                  <div
                    className="mt-5 lg:mt-[1.2cqw] lg:px-[0.2cqw] lg:text-[length:var(--fs)]"
                    style={{
                      '--fs': 'max(14px, 0.8421cqw)',
                    }}
                  >
                    <h3 className="text-[20px] lg:text-[1.25em] font-semibold leading-[1.34] text-ink2 lg:pr-[0.5cqw] line-clamp-2">
                      {title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[1.43] text-black opacity-70 lg:mt-[0.9cqw] lg:text-[0.875em] line-clamp-2">
                      {excerpt}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
