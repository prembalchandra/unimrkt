'use client';

import React from 'react';
import Link from 'next/link';

export default function MomentsSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white text-slate-900 lg:!pb-[92px] lg:!pt-[67.5px] !bg-[#f7f7f4]">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 min-[1664px]:px-0">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-semibold capitalize !leading-[1.2] lg:tracking-[-3px] text-heading">
            Moments of Excellence
          </h2>
          <p className="text-base !leading-[1.9] opacity-80 mt-[3px] max-w-none text-heading lg:whitespace-nowrap">
            Showcasing the expertise, innovation, and dedication behind every research project and client success story.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: Large Video Card */}
          <div className="relative overflow-hidden rounded-video-lg bg-ink-900 aspect-[790/370] sm:col-span-2 group">
            <div className="block h-full w-full">
              <img
                alt="Moments of Excellence"
                loading="eager"
                className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
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
                src="/uploads/gallery_large_1_7f89e8a396.jpg"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity"
              aria-hidden="true"
            >
              <div className="flex size-[50px] items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 translate-x-0.5 text-white"
                >
                  <path
                    d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 2: Large Video Card */}
          <div className="relative overflow-hidden rounded-video-lg bg-ink-900 aspect-[790/370] sm:col-span-2 group">
            <div className="block h-full w-full">
              <img
                alt="Moments of Excellence"
                loading="eager"
                className="object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
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
                src="/uploads/gallery_large_2_4e72e58ce0.jpg"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity"
              aria-hidden="true"
            >
              <div className="flex size-[50px] items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5 translate-x-0.5 text-white"
                >
                  <path
                    d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3: Small Card */}
          <div className="relative overflow-hidden rounded-video-lg bg-ink-900 aspect-[380/370] group">
            <div className="block h-full w-full">
              <img
                alt="Moments of Excellence"
                loading="eager"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                src="/uploads/gallery_small_1_0399c8a5d7.jpg"
              />
            </div>
          </div>

          {/* Card 4: Small Card */}
          <div className="relative overflow-hidden rounded-video-lg bg-ink-900 aspect-[380/370] group">
            <div className="block h-full w-full">
              <img
                alt="Moments of Excellence"
                loading="eager"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                src="/uploads/gallery_small_2_030b8b4afb.jpg"
              />
            </div>
          </div>

          {/* Card 5: Small Card */}
          <div className="relative overflow-hidden rounded-video-lg bg-ink-900 aspect-[380/370] group">
            <div className="block h-full w-full">
              <img
                alt="Moments of Excellence"
                loading="eager"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                src="/uploads/gallery_small_3_054d8506f3.jpg"
              />
            </div>
          </div>

          {/* Card 6: Small Card */}
          <div className="relative overflow-hidden rounded-video-lg bg-ink-900 aspect-[380/370] group">
            <div className="block h-full w-full">
              <img
                alt="Moments of Excellence"
                loading="eager"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                src="/uploads/gallery_small_4_279aef17dd.jpg"
              />
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="mt-[46px] flex flex-wrap justify-center gap-3">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center gap-1 rounded-btn px-10 min-h-[60px] font-sans text-[13px] font-bold uppercase leading-[1.3] tracking-[0.06em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 motion-reduce:transition-none disabled:opacity-50 disabled:pointer-events-none bg-gradient-to-r from-gradient-from to-gradient-to text-white hover:brightness-110 focus-visible:ring-brand-600"
          >
            Browse Gallery
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="size-4"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7M17 7H9M17 7v8"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
