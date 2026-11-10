'use client';

import React, { useState, useEffect } from 'react';
import { getStrapiMedia } from '../../../lib/strapi';

const THRESHOLD = 18;
const ITEMS_PER_PAGE = 10;

function formatMember(m) {
  if (!m) return null;
  const slug = (m.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return {
    id: m.id || m.documentId || slug,
    name: m.name || '',
    role: m.role || '',
    image: getStrapiMedia(m.photo, `/asstes/images/team/${slug}.png`),
    bio: m.bio || '',
    linkedin: m.linkedin_url || m.linkedinUrl || m.linkedin || '#',
  };
}

export default function TeamDirectory({ initialTeam = [], dynamicSection = null }) {
  const [members, setMembers] = useState(() => (initialTeam || []).map(formatMember).filter(Boolean));
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);

  const displayKicker = dynamicSection?.kicker || '';
  const displayHeading = dynamicSection?.heading || dynamicSection?.title || 'People. Expertise. Impact.';
  const displayDesc = dynamicSection?.description || '';

  useEffect(() => {
    if (initialTeam && initialTeam.length > 0) {
      setMembers(initialTeam.map(formatMember).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(`${STRAPI_URL}/api/team-members?populate=*&sort=order:asc`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setMembers(d.data.map(formatMember).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialTeam]);

  // Pagination logic: If total members > 18, paginate with 10 items per page
  const shouldPaginate = members.length > THRESHOLD;
  const totalPages = shouldPaginate ? Math.ceil(members.length / ITEMS_PER_PAGE) : 1;

  const visibleMembers = shouldPaginate
    ? members.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : members;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (typeof window !== 'undefined') {
        const gridElem = document.getElementById('teamProfileGrid');
        if (gridElem) {
          gridElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    if (!selectedMember) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMember]);

  return (
    <section className="team-page-section" aria-labelledby="team-page-title">
      <div className="srcn-container">
        <div className="section-header-area" style={{ marginBottom: '32px' }}>
          {displayKicker && <span className="career-values-kicker">{displayKicker}</span>}
          <h2 id="team-page-title" className="section-main-heading">
            {displayHeading}
          </h2>
          {displayDesc && <p className="section-sub-text">{displayDesc}</p>}
        </div>

        <div className="team-profile-grid" id="teamProfileGrid">
          {visibleMembers.map((member) => (
            <article
              key={member.id}
              className="team-profile-card"
              data-name={member.name}
              data-role={member.role}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedMember(member)}
            >
              <div className="team-profile-photo">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  style={{ width: '100%', height: '280px', objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>
              <div className="team-profile-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div
                  className="team-profile-actions"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="team-view-profile hero-common-btn-area btn-border-sm"
                    type="button"
                    onClick={() => setSelectedMember(member)}
                  >
                    <span>VIEW PROFILE</span>
                    <i className="fa fa-long-arrow-up" aria-hidden="true"></i>
                  </button>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-linkedin-icon"
                    aria-label={`${member.name} LinkedIn Profile`}
                  >
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination - Exact same design as Blog and Case Study pages */}
        {shouldPaginate && totalPages > 1 && (
          <div className="blog-pagination-area" style={{ display: 'flex', marginTop: '48px' }}>
            <button
              type="button"
              className="pagination-item arrow-btn"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              aria-label="Previous page"
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`pagination-item ${page === currentPage ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
                aria-current={page === currentPage ? 'page' : 'false'}
                aria-label={`Page ${page}`}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="pagination-item arrow-btn"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              aria-label="Next page"
            >
              <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        )}
      </div>

      {/* Team Member Profile Modal - Centered (Matches User Screenshot) */}
      {selectedMember && (
        <div
          className="team-profile-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedMember(null);
          }}
        >
          <div
            className="team-profile-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="teamProfileModalName"
          >
            <button
              className="team-modal-close-btn"
              type="button"
              aria-label="Close profile"
              onClick={() => setSelectedMember(null)}
            >
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            </button>

            <div className="team-modal-grid-layout">
              <div className="team-modal-photo-col">
                <div className="team-modal-photo-wrap">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                  />
                </div>
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-modal-linkedin-badge"
                  aria-label="View LinkedIn profile"
                >
                  <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
                </a>
              </div>
              <div className="team-modal-content-col">
                <h2 id="teamProfileModalName" className="team-modal-person-name">
                  {selectedMember.name}
                </h2>
                <p className="team-modal-person-role">
                  {selectedMember.role}
                </p>
                <span className="team-modal-red-bar team-modal-rule" aria-hidden="true"></span>
                <p className="team-modal-person-bio">
                  {selectedMember.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
