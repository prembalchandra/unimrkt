import React from 'react';
import Link from 'next/link';

export default function ServicesBreadcrumb() {
  return (
    <div className="relative z-10 w-full bg-white shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
      <nav aria-label="Breadcrumb" className="mx-auto flex min-h-[60px] w-full max-w-container items-center gap-[7px] px-4 sm:px-6 lg:px-8 min-[1700px]:px-0">
        <span className="inline-flex items-center gap-[7px] shrink-0">
          <Link
            className="inline-flex min-h-[44px] items-center font-sans text-[14px] font-semibold leading-[1.2] text-[#b52c2c] transition-colors duration-200 ease-in-out hover:text-[#8a1f1f] focus-visible:text-[#8a1f1f]"
            href="/"
          >
            Home
          </Link>
          <span className="inline-flex size-3 shrink-0 items-center justify-center" aria-hidden="true">
            <svg width="4" height="7.42857" viewBox="0 0 4 7.42857" fill="none" xmlns="http://www.w3.org/2000/svg" className="-scale-x-100">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.85355 0.155413C4.04882 0.36263 4.04882 0.698595 3.85355 0.905812L1.20711 3.71429L3.85355 6.52276C4.04882 6.72998 4.04882 7.06594 3.85355 7.27316C3.65829 7.48038 3.34171 7.48038 3.14645 7.27316L0.146447 4.08949C-0.0488155 3.88227 -0.0488155 3.5463 0.146447 3.33909L3.14645 0.155413C3.34171 -0.0518043 3.65829 -0.0518043 3.85355 0.155413Z" fill="#111827"></path>
            </svg>
          </span>
        </span>
        <span className="inline-flex items-center gap-[7px] min-w-0">
          <span aria-current="page" className="min-w-0 truncate font-sans text-[14px] font-normal leading-[1.2] text-[#868484]">
            Services
          </span>
        </span>
      </nav>
    </div>
  );
}
