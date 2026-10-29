import React from 'react';
import Link from 'next/link';

export default function BlogDetailBreadcrumb() {
  return (
    <div className="blog-detail-breadcrumb">
      <div className="srcn-container">
        <nav aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/blog">Insights &amp; Stories</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">Automotive Industry</span>
        </nav>
      </div>
    </div>
  );
}
