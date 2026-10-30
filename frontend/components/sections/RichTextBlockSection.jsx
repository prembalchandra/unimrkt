'use client';

import React from 'react';

export default function RichTextBlockSection({ data = {} }) {
  if (!data) return null;

  const title = data.title || '';
  const content = data.content;

  const renderContent = (blocks) => {
    if (!blocks) return null;
    if (typeof blocks === 'string') return <p>{blocks}</p>;
    if (!Array.isArray(blocks)) return null;

    return blocks.map((block, idx) => {
      if (block.type === 'paragraph') {
        const text = block.children?.map((c) => c.text).join('') || '';
        return <p key={idx} className="hero-common-title" style={{ marginBottom: '16px' }}>{text}</p>;
      }
      if (block.type === 'heading') {
        const text = block.children?.map((c) => c.text).join('') || '';
        return <h3 key={idx} style={{ marginTop: '24px', marginBottom: '12px' }}>{text}</h3>;
      }
      return null;
    });
  };

  return (
    <section className="rich-text-section" style={{ padding: '60px 0' }}>
      <div className="srcn-container">
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {title && <h2 className="section-main-heading" style={{ marginBottom: '25px' }}>{title}</h2>}
          <div className="rich-text-body">
            {renderContent(content)}
          </div>
        </div>
      </div>
    </section>
  );
}
