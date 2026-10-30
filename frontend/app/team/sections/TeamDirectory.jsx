'use client';

import React, { useState, useEffect } from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Anurag Magoo',
    role: 'Co-Founder',
    image: '/asstes/images/team/anurag-magoo.webp',
    bio: 'Anurag Magoo is the Co-Founder of Unimrkt Research, with specializations in Key Account Management, Research Analysis, Strategy Planning & Execution, and Process Reengineering. He has over 26+ years of industry experience across global research operations and corporate development.',
    linkedin: 'https://www.linkedin.com/in/anurag-magoo-92261611/',
  },
  {
    id: 2,
    name: 'Sandeep Kumar',
    role: 'Co-Founder',
    image: '/asstes/images/team/sandeep-kumar.webp',
    bio: 'Sandeep Kumar is the Co-Founder and Chief Executive Officer of Unimrkt Research. He leads organizational vision, global business expansion, strategic client partnerships, and cross-border research operational excellence across 90+ countries.',
    linkedin: 'https://www.linkedin.com/in/sandeep-kumar-1756598/',
  },
  {
    id: 3,
    name: 'Kanishk Sheel',
    role: 'SVP - Business Development & Client Relations',
    image: '/asstes/images/team/kanishk-sheel.webp',
    bio: 'Kanishk Sheel serves as Senior Vice President of Business Development and Client Relations at Unimrkt Research. He drives strategic enterprise client relationships, global market penetration, and bespoke research consulting worldwide.',
    linkedin: 'https://www.linkedin.com/in/kanishk-sheel-6a849b22/',
  },
  {
    id: 4,
    name: 'James Wild',
    role: 'Principal Consultant - North America',
    image: '/asstes/images/team/james-wild.webp',
    bio: 'James Wild is the Principal Consultant for North America at Unimrkt Research. He directs regional client engagements, market expansion, and custom quantitative and qualitative research initiatives across the United States and Canada.',
    linkedin: 'https://www.linkedin.com/in/james-wild-8b22a03/',
  },
  {
    id: 5,
    name: 'Mann Sharma',
    role: 'Senior Director - Operations',
    image: '/asstes/images/team/mann-sharma.webp',
    bio: 'Mann Sharma is Senior Director of Operations at Unimrkt Research. He oversees comprehensive research fieldwork, quantitative methodologies, survey execution teams, and operational compliance to maintain world-class data delivery.',
    linkedin: 'https://www.linkedin.com/in/mann-sharma-51368916/',
  },
  {
    id: 6,
    name: 'Veronika Sharma',
    role: 'Director - Client Services',
    image: '/asstes/images/team/veronika-sharma.webp',
    bio: 'Veronika Sharma serves as Director of Client Services. She focuses on client delight, key account relationship management, research delivery coordination, and ensuring timely, high-impact business insights for global partners.',
    linkedin: 'https://www.linkedin.com/in/veronika-sharma-6a084052/',
  },
  {
    id: 7,
    name: 'Alex Parkman',
    role: 'Director - Client Services',
    image: '/asstes/images/team/alex-parkman.webp',
    bio: 'Alex Parkman is Director of Client Services at Unimrkt Research. He specializes in multinational client solutions, project management, market research lifecycle delivery, and cross-functional team coordination.',
    linkedin: 'https://www.linkedin.com/in/alex-parkman-94269925/',
  },
  {
    id: 8,
    name: 'Sanjay Kumar',
    role: 'AVP - IT, Telecom & Business Development',
    image: '/asstes/images/team/sanjay-kumar.webp',
    bio: 'Sanjay Kumar is Associate Vice President for IT, Telecom & Business Development. He drives technological transformation, secure infrastructure, survey tech automation, and telecom enterprise client solutions.',
    linkedin: 'https://www.linkedin.com/in/sanjay-kumar-65b1b424/',
  },
  {
    id: 9,
    name: 'Rahul Maini',
    role: 'Senior Manager - Corporate Communication',
    image: '/asstes/images/team/rahul-maini.webp',
    bio: 'Rahul Maini is Senior Manager of Corporate Communication and Business Development. He leads brand positioning, international outreach, market engagement campaigns, and stakeholder communications.',
    linkedin: 'https://www.linkedin.com/in/rahul-maini-a1780468/',
  },
  {
    id: 10,
    name: 'Chris Griswold',
    role: 'Senior Director - Business Development',
    image: '/asstes/images/team/chris-griswold.webp',
    bio: 'Chris Griswold is Senior Director of Business Development. With deep expertise in market intelligence and strategic advisory, he accelerates enterprise partnerships and research program adoption across North America and Europe.',
    linkedin: 'https://www.linkedin.com/in/chris-griswold-9860b714/',
  },
  {
    id: 11,
    name: 'Ratan Singh Chauhan',
    role: 'Assistant Director - Field Operations',
    image: '/asstes/images/team/ratan-singh-chauhan.webp',
    bio: 'Ratan Singh Chauhan is Assistant Director of Field Operations. He manages multi-country quantitative fieldwork, respondent sampling, interviewer team quality oversight, and on-ground data collection integrity.',
    linkedin: 'https://www.linkedin.com/in/ratan-singh-chauhan-691b0126/',
  },
  {
    id: 12,
    name: 'Vishal Parashar',
    role: 'Head - Operations & Insights',
    image: '/asstes/images/team/vishal-parashar.webp',
    bio: 'Vishal Parashar is Head of Operations & Insights. He is responsible for translating complex empirical data into actionable strategic findings, overseeing analytical rigor, and standardizing quality control frameworks.',
    linkedin: 'https://www.linkedin.com/in/vishal-parashar-04803730/',
  },
  {
    id: 13,
    name: 'Narinder Vadhera',
    role: 'Associate Director - Data Quality',
    image: '/asstes/images/team/narinder-vadhera.webp',
    bio: 'Narinder Vadhera serves as Associate Director of Data Quality. With extensive experience in survey auditing and validation, he leads strict compliance protocols to ensure data accuracy across all research centers.',
    linkedin: 'https://www.linkedin.com/in/narinder-vadhera-1a73b53b/',
  },
  {
    id: 14,
    name: 'Yashasvini Daulat Bhatt',
    role: 'Head - Data Quality and Training',
    image: '/asstes/images/team/yashasvini-daulat-bhatt.webp',
    bio: 'Yashasvini Daulat Bhatt is Head of Data Quality and Training. She designs interviewer training curricula, respondent validation frameworks, and quality control systems aligned with ISO 20252 and ISO 9001 standards.',
    linkedin: 'https://www.linkedin.com/in/yashasvini-daulat-bhatt-04838612/',
  },
  {
    id: 15,
    name: 'Sushmaunt Singh',
    role: 'Director - Field Operations',
    image: '/asstes/images/team/sushmaunt-singh.webp',
    bio: 'Sushmaunt Singh is Director of Field Operations at Unimrkt Research. He leads nationwide CATI operations, interviewer productivity, complex sampling designs, and multi-market project execution.',
    linkedin: 'https://www.linkedin.com/in/sushmaunt-singh-93b70823/',
  },
  {
    id: 16,
    name: 'Geetha Chauhan',
    role: 'Lead - Operations',
    image: '/asstes/images/team/geetha-chauhan.webp',
    bio: 'Geetha Chauhan is Lead of Operations at Unimrkt Research, specializing in operational workflows, interviewer resource scheduling, quality auditing, and cross-departmental project tracking.',
    linkedin: 'https://www.linkedin.com/in/geetha-chauhan-b5145b41/',
  },
  {
    id: 17,
    name: 'Ghol Bishi',
    role: 'Director - Business Development',
    image: '/asstes/images/team/ghol-bishi.webp',
    bio: 'Ghol Bishi is Director of Business Development, focusing on identifying emerging market opportunities, client relationship management, and customized market intelligence consulting across key sectors.',
    linkedin: 'https://www.linkedin.com/in/ghol-bishi-24a9193b/',
  },
  {
    id: 18,
    name: 'Ritu Verma',
    role: 'Manager - Team Building',
    image: '/asstes/images/team/ritu-verma.webp',
    bio: 'Ritu Verma serves as Manager of Team Building and Human Resources, fostering organizational culture, specialized research talent acquisition, leadership development, and employee excellence.',
    linkedin: 'https://www.linkedin.com/in/ritu-verma-9a647318/',
  },
  {
    id: 19,
    name: 'Krystal Richardson',
    role: 'Manager - Business Development',
    image: '/asstes/images/team/krystal-richardson.webp',
    bio: 'Krystal Richardson is Manager of Business Development, spearheading international client onboarding, client discovery sessions, and tailored research proposals for global enterprise brands.',
    linkedin: 'https://www.linkedin.com/in/krystal-richardson-35359a43/',
  },
];

const THRESHOLD = 18;
const ITEMS_PER_PAGE = 10;

export default function TeamDirectory({ initialTeam = [] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);

  const mergedMembers = React.useMemo(() => {
    if (!initialTeam || initialTeam.length === 0) return teamMembers;
    return teamMembers.map((local) => {
      const strapiMatch = initialTeam.find(
        (s) => s.name?.trim().toLowerCase() === local.name?.trim().toLowerCase()
      );
      if (strapiMatch) {
        return {
          ...local,
          role: strapiMatch.role || local.role,
          bio: strapiMatch.bio || local.bio,
          linkedin: strapiMatch.linkedinUrl || strapiMatch.linkedin_url || local.linkedin,
        };
      }
      return local;
    });
  }, [initialTeam]);

  // Pagination logic: If total members > 18, paginate with 10 items per page
  const shouldPaginate = mergedMembers.length > THRESHOLD;
  const totalPages = shouldPaginate ? Math.ceil(mergedMembers.length / ITEMS_PER_PAGE) : 1;

  const visibleMembers = shouldPaginate
    ? mergedMembers.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : mergedMembers;

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
        <h2 id="team-page-title" className="section-main-heading">
          People. Expertise. Impact.
        </h2>

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
