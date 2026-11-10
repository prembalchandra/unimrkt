import React from 'react';
import Link from 'next/link';
import { getStrapiMedia } from '../lib/strapi';

function renderTextNode(child, index) {
  if (!child) return null;
  let text = child.text || '';

  if (child.bold) text = <strong key={`b-${index}`}>{text}</strong>;
  if (child.italic) text = <em key={`i-${index}`}>{text}</em>;
  if (child.underline) text = <u key={`u-${index}`}>{text}</u>;
  if (child.strikethrough) text = <s key={`s-${index}`}>{text}</s>;
  if (child.code) text = <code key={`c-${index}`}>{text}</code>;

  return text;
}

function renderChildren(children) {
  if (!Array.isArray(children)) return null;
  return children.map((child, idx) => {
    if (child.type === 'link') {
      const isInternal = child.url?.startsWith('/');
      if (isInternal) {
        return (
          <Link key={idx} href={child.url} className="rich-text-link">
            {renderChildren(child.children)}
          </Link>
        );
      }
      return (
        <a
          key={idx}
          href={child.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rich-text-link"
        >
          {renderChildren(child.children)}
        </a>
      );
    }
    return <React.Fragment key={idx}>{renderTextNode(child, idx)}</React.Fragment>;
  });
}

export default function StrapiBlocksRenderer({ content, className = '' }) {
  if (!content) return null;

  // If plain HTML/markdown string is passed
  if (typeof content === 'string') {
    return (
      <div
        className={`strapi-rich-text ${className}`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  }

  // If Strapi 5 Blocks array is passed
  if (Array.isArray(content)) {
    return (
      <div className={`strapi-rich-text ${className}`}>
        {content.map((block, idx) => {
          switch (block.type) {
            case 'heading': {
              const level = Math.min(Math.max(block.level || 2, 1), 6);
              const Tag = `h${level}`;
              return <Tag key={idx}>{renderChildren(block.children)}</Tag>;
            }
            case 'paragraph':
              return <p key={idx}>{renderChildren(block.children)}</p>;
            case 'list': {
              const ListTag = block.format === 'ordered' ? 'ol' : 'ul';
              return (
                <ListTag key={idx}>
                  {(block.children || []).map((item, itemIdx) => (
                    <li key={itemIdx}>{renderChildren(item.children)}</li>
                  ))}
                </ListTag>
              );
            }
            case 'quote':
              return (
                <blockquote key={idx} className="rich-text-quote">
                  <p>{renderChildren(block.children)}</p>
                </blockquote>
              );
            case 'code':
              return (
                <pre key={idx}>
                  <code>{renderChildren(block.children)}</code>
                </pre>
              );
            case 'image': {
              const src = getStrapiMedia(block.image);
              return (
                <figure key={idx} className="rich-text-figure">
                  <img src={src} alt={block.image?.alternativeText || 'Blog image'} loading="lazy" />
                  {block.image?.caption && <figcaption>{block.image.caption}</figcaption>}
                </figure>
              );
            }
            default:
              if (block.children) {
                return <p key={idx}>{renderChildren(block.children)}</p>;
              }
              return null;
          }
        })}
      </div>
    );
  }

  return null;
}
