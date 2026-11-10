const fs = require('fs');
const path = require('path');

console.log('Cleaning Work / Careers sections...');

// 1. CareerValues.jsx
const valuesPath = path.join(__dirname, '../app/work/sections/CareerValues.jsx');
const valuesCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getValueIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('team')) return getStrapiMedia('/uploads/team-work-icon-img.png');
  if (t.includes('ethic') || t.includes('integrity') || t.includes('business')) return getStrapiMedia('/uploads/business-icon-img.png');
  if (t.includes('diver')) return getStrapiMedia('/uploads/diversity-icon-img.png');
  if (t.includes('transpar')) return getStrapiMedia('/uploads/transparency-icon-img.png');
  return getStrapiMedia('/uploads/communication-icon-img.png');
}

export default function CareerValues({ dynamicValues = null }) {
  const kicker = dynamicValues?.kicker;
  const heading = dynamicValues?.heading || dynamicValues?.title;
  const description = dynamicValues?.description || dynamicValues?.subtitle;

  const valList = (dynamicValues?.values || []).map((v) => ({
    icon: v.icon ? getStrapiMedia(v.icon) : getValueIcon(v.title),
    title: v.title || '',
  }));

  if (valList.length === 0 && !heading) return null;

  return (
    <section className="career-values-section">
      <div className="srcn-container">
        {(kicker || heading || description) && (
          <header className="career-values-header">
            {kicker && <span className="career-values-kicker">{kicker}</span>}
            {heading && <h2 className="section-main-heading">{heading}</h2>}
            {description && <p className="section-sub-text">{description}</p>}
          </header>
        )}
        {valList.length > 0 && (
          <div className="career-values-grid">
            {valList.map((v, i) => (
              <div key={i} className="career-value-col">
                <div className="career-value-card">
                  {v.icon && (
                    <div className="career-value-icon">
                      <img src={v.icon} alt={v.title} />
                    </div>
                  )}
                  {v.title && <h3>{v.title}</h3>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
`;
fs.writeFileSync(valuesPath, valuesCode, 'utf8');
console.log('✓ CareerValues.jsx updated');

// 2. CareerBenefits.jsx
const benefitsPath = path.join(__dirname, '../app/work/sections/CareerBenefits.jsx');
const benefitsCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getBenefitIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('stock') || t.includes('sar')) return getStrapiMedia('/uploads/stock-icon-img.png');
  if (t.includes('compensatory') || t.includes('bonus')) return getStrapiMedia('/uploads/compensatory-icon-img.png');
  if (t.includes('job') || t.includes('posting')) return getStrapiMedia('/uploads/internal-job-posting-iocn-img.png');
  if (t.includes('mediclaim') || t.includes('health') || t.includes('insur')) return getStrapiMedia('/uploads/mediclaim-icon-img.png');
  if (t.includes('transport') || t.includes('cab')) return getStrapiMedia('/uploads/transport-icon-img.png');
  if (t.includes('leave') || t.includes('encash')) return getStrapiMedia('/uploads/leave-encashment-iocn-img.png');
  if (t.includes('meal') || t.includes('food')) return getStrapiMedia('/uploads/meal-facility-icon-img.png');
  return getStrapiMedia('/uploads/stock-icon-img.png');
}

export default function CareerBenefits({ dynamicBenefits = null }) {
  const kicker = dynamicBenefits?.kicker;
  const heading = dynamicBenefits?.title || dynamicBenefits?.heading;
  const description = dynamicBenefits?.subtitle || dynamicBenefits?.description;
  const bannerImage = dynamicBenefits?.image ? getStrapiMedia(dynamicBenefits.image) : getStrapiMedia('/uploads/jab-about-img.png');

  const benefitsList = (dynamicBenefits?.values || []).map((b) => ({
    icon: b.icon ? getStrapiMedia(b.icon) : getBenefitIcon(b.title),
    title: b.title || '',
  }));

  if (benefitsList.length === 0 && !heading) return null;

  return (
    <section className="career-benefits-section" id="career-benefits">
      <div className="srcn-container">
        <div className="career-benefits-layout">
          {bannerImage && (
            <div className="career-benefits-image">
              <img src={bannerImage} alt={heading || 'Unimrkt Benefits'} loading="lazy" />
            </div>
          )}

          <div className="career-benefits-content">
            {kicker && (
              <span className="career-benefits-kicker career-values-kicker">
                {kicker}
              </span>
            )}
            {heading && <h2 className="section-main-heading">{heading}</h2>}
            {description && (
              <p className="career-benefits-intro section-sub-text">
                {description}
              </p>
            )}

            {benefitsList.length > 0 && (
              <div className="career-benefits-list">
                {benefitsList.map((b, i) => (
                  <div key={i} className="career-benefit-item">
                    {b.icon && (
                      <span className="career-benefit-icon">
                        <img src={b.icon} alt={b.title} />
                      </span>
                    )}
                    {b.title && <span>{b.title}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
`;
fs.writeFileSync(benefitsPath, benefitsCode, 'utf8');
console.log('✓ CareerBenefits.jsx updated');

// 3. CareerJourney.jsx
const journeyPath = path.join(__dirname, '../app/work/sections/CareerJourney.jsx');
const journeyCode = `import React from 'react';
import { getStrapiMedia } from '@/lib/strapi';

function getJourneyIcon(title = '') {
  const t = title.toLowerCase();
  if (t.includes('apply')) return getStrapiMedia('/uploads/clipboard-tick-icon-img.png');
  if (t.includes('connect')) return getStrapiMedia('/uploads/profile-2user.png');
  if (t.includes('interview')) return getStrapiMedia('/uploads/Interview-user-tag-icon-img.png');
  return getStrapiMedia('/uploads/job-icon-img.png');
}

export default function CareerJourney({ dynamicJourney = null }) {
  const kicker = dynamicJourney?.kicker;
  const heading = dynamicJourney?.title || dynamicJourney?.heading;
  const description = dynamicJourney?.subtitle || dynamicJourney?.description;

  const stepsList = (dynamicJourney?.values || []).map((s) => ({
    icon: s.icon ? getStrapiMedia(s.icon) : getJourneyIcon(s.title),
    num: s.title || '',
    desc: s.description || '',
  }));

  if (stepsList.length === 0 && !heading) return null;

  return (
    <section className="career-journey-section">
      <div className="srcn-container">
        {(kicker || heading || description) && (
          <header className="career-journey-header">
            {kicker && <span className="career-journey-kicker career-values-kicker">{kicker}</span>}
            {heading && <h2 className="section-main-heading">{heading}</h2>}
            {description && <p className="section-sub-text">{description}</p>}
          </header>
        )}

        {stepsList.length > 0 && (
          <div className="career-journey-steps">
            {stepsList.map((s, i) => (
              <div key={i} className="career-journey-step">
                {s.icon && (
                  <div className="career-journey-icon">
                    <img src={s.icon} alt={s.desc || s.num} />
                  </div>
                )}
                <div className="career-journey-content">
                  {s.num && <h3>{s.num}</h3>}
                  {s.desc && <p>{s.desc}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
`;
fs.writeFileSync(journeyPath, journeyCode, 'utf8');
console.log('✓ CareerJourney.jsx updated');

// 4. CareerJoin.jsx
const joinPath = path.join(__dirname, '../app/work/sections/CareerJoin.jsx');
const joinCode = `import React from 'react';
import StrapiBlocksRenderer from '@/components/StrapiBlocksRenderer';

export default function CareerJoin({ dynamicSection = null, dynamicJoin = null }) {
  const sectionData = dynamicSection || dynamicJoin;
  const kicker = sectionData?.kicker;
  const heading = sectionData?.heading || sectionData?.title;
  const content = sectionData?.content;
  const description = sectionData?.description;

  if (!sectionData) return null;

  return (
    <section className="career-join-section">
      <div className="srcn-container">
        {kicker && <span className="career-values-kicker sub-title-red">{kicker}</span>}
        {heading && <h2 className="career-fraud-heading">{heading}</h2>}
        {content ? (
          <div className="career-join-blocks">
            <StrapiBlocksRenderer content={content} />
          </div>
        ) : description ? (
          <p>{description}</p>
        ) : null}
      </div>
    </section>
  );
}
`;
fs.writeFileSync(joinPath, joinCode, 'utf8');
console.log('✓ CareerJoin.jsx updated');

// 5. WorkFaq.jsx
const faqPath = path.join(__dirname, '../app/work/sections/WorkFaq.jsx');
const faqCode = `'use client';

import React, { useState, useEffect } from 'react';
import { getStrapiMedia } from '@/lib/strapi';

export default function WorkFaq({ dynamicFaq = null }) {
  const [faqs, setFaqs] = useState(() => dynamicFaq?.items || []);
  const [openIndex, setOpenIndex] = useState(0);

  const kicker = dynamicFaq?.kicker;
  const heading = dynamicFaq?.heading || dynamicFaq?.title;
  const mapBanner = dynamicFaq?.bannerImage ? getStrapiMedia(dynamicFaq.bannerImage) : getStrapiMedia('/uploads/unimrkt-resarch-map-banner-img.png');

  useEffect(() => {
    if (dynamicFaq?.items && dynamicFaq.items.length > 0) {
      setFaqs(dynamicFaq.items);
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(\`\${STRAPI_URL}/api/faqs?pageSlug=work&pagination[limit]=10&sort=order:asc\`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data) && d.data.length > 0) {
            setFaqs(d.data);
          }
        })
        .catch(() => {});
    }
  }, [dynamicFaq]);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (faqs.length === 0 && !heading) return null;

  return (
    <section className="faq-section-area">
      {mapBanner && (
        <div className="worldmap-bg">
          <img src={mapBanner} alt={heading || 'FAQ'} />
        </div>
      )}
      <div className="srcn-container">
        {(kicker || heading) && (
          <div className="section-header-area">
            {kicker && <span className="career-values-kicker">{kicker}</span>}
            {heading && <h2 className="section-main-heading">{heading}</h2>}
          </div>
        )}

        {faqs.length > 0 && (
          <div className="faq-accordion-container">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.id || index} className={\`faq-accordion-item \${isOpen ? 'active' : ''}\`}>
                  <div
                    className="faq-accordion-header"
                    onClick={() => toggleFaq(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <span className="faq-icon-indicator" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {isOpen && (
                    <div className="faq-accordion-body">
                      <p className="faq-accordion-answer">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
`;
fs.writeFileSync(faqPath, faqCode, 'utf8');
console.log('✓ WorkFaq.jsx updated');

// 6. CareerOpenings.jsx
const openingsPath = path.join(__dirname, '../app/work/sections/CareerOpenings.jsx');
const openingsCode = `'use client';

import React, { useState, useMemo, useEffect } from 'react';
import StrapiBlocksRenderer from '@/components/StrapiBlocksRenderer';
import { submitContactInquiry, getStrapiMedia } from '@/lib/strapi';

function formatJob(job, idx) {
  if (!job) return null;
  const deptLabel = job.department || '';
  const typeLabel = job.job_type || job.jobType || '';
  const locationLabel = job.location || '';
  const dateLabel = job.posted_date || job.postedDate
    ? new Date(job.posted_date || job.postedDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

  const descContent = job.description ? (
    <StrapiBlocksRenderer content={job.description} />
  ) : null;

  const metaParts = [locationLabel, typeLabel, deptLabel, dateLabel].filter(Boolean);

  return {
    id: job.id || job.documentId || idx + 1,
    slug: job.slug || '',
    title: job.title || '',
    department: deptLabel.toLowerCase(),
    deptLabel,
    type: typeLabel.toLowerCase(),
    typeLabel,
    location: locationLabel.toLowerCase(),
    locationLabel,
    dateLabel,
    metaText: metaParts.join(' · '),
    description: descContent,
  };
}

export default function CareerOpenings({ initialJobs = [], dynamicSection = null }) {
  const [jobs, setJobs] = useState(() => (initialJobs || []).map(formatJob).filter(Boolean));
  const [searchQuery, setSearchQuery] = useState('');
  const [department, setDepartment] = useState('');
  const [jobType, setJobType] = useState('');
  const [location, setLocation] = useState('');
  const [visibleCount, setVisibleCount] = useState(4);

  const displayKicker = dynamicSection?.kicker;
  const displayHeading = dynamicSection?.heading || dynamicSection?.title;
  const displayDesc = dynamicSection?.description;

  const [selectedJob, setSelectedJob] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyStatus, setApplyStatus] = useState('');
  const [applySubmitting, setApplySubmitting] = useState(false);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formExperience, setFormExperience] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formMessage, setFormMessage] = useState('');

  const jobIcon = getStrapiMedia('/uploads/job-icon-img.png');
  const locationIcon = getStrapiMedia('/uploads/location-icon-img.png');
  const briefcaseIcon = getStrapiMedia('/uploads/briefcase-icon-img.png');
  const userIcon = getStrapiMedia('/uploads/profile-user-icon-img.png');
  const calendarIcon = getStrapiMedia('/uploads/calendar-icon-img.png');

  useEffect(() => {
    if (initialJobs && initialJobs.length > 0) {
      setJobs(initialJobs.map(formatJob).filter(Boolean));
    } else {
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
      fetch(\`\${STRAPI_URL}/api/career-jobs?pagination[limit]=20\`)
        .then((r) => r.json())
        .then((d) => {
          if (Array.isArray(d?.data)) {
            setJobs(d.data.map(formatJob).filter(Boolean));
          }
        })
        .catch(() => {});
    }
  }, [initialJobs]);

  const departmentOptions = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => { if (j.deptLabel) set.add(j.deptLabel); });
    return Array.from(set);
  }, [jobs]);

  const jobTypeOptions = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => { if (j.typeLabel) set.add(j.typeLabel); });
    return Array.from(set);
  }, [jobs]);

  const locationOptions = useMemo(() => {
    const set = new Set();
    jobs.forEach((j) => { if (j.locationLabel) set.add(j.locationLabel); });
    return Array.from(set);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q);
      const matchDept = !department || job.deptLabel === department;
      const matchType = !jobType || job.typeLabel === jobType;
      const matchLoc = !location || job.locationLabel === location;
      return matchSearch && matchDept && matchType && matchLoc;
    });
  }, [jobs, searchQuery, department, jobType, location]);

  const visibleJobs = filteredJobs.slice(0, visibleCount);

  useEffect(() => {
    if (isDetailsModalOpen || isApplyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsDetailsModalOpen(false);
        setIsApplyModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDetailsModalOpen, isApplyModalOpen]);

  const handleOpenDetails = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(true);
  };

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setIsDetailsModalOpen(false);
    setIsApplyModalOpen(true);
    setApplyStatus('');
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    setApplySubmitting(true);
    setApplyStatus('Submitting your application...');

    try {
      await submitContactInquiry({
        name: formName,
        email: formEmail,
        phone: formPhone,
        company: \`Applicant: \${selectedJob?.title || 'General'}\`,
        message: \`Job Application for: \${selectedJob?.title || 'Open Role'}\\nExperience: \${formExperience}\\nCurrent Location: \${formLocation}\\nMessage: \${formMessage || 'None'}\`,
        sourcePage: \`careers-\${selectedJob?.slug || selectedJob?.id || 'work'}\`,
        countryCode: '+91',
        consent: true,
      });

      setApplyStatus('Thank you! Your application has been submitted successfully to our talent team.');
      setTimeout(() => {
        setIsApplyModalOpen(false);
        setApplyStatus('');
        setFormName('');
        setFormEmail('');
        setFormPhone('');
        setFormExperience('');
        setFormLocation('');
        setFormMessage('');
      }, 3500);
    } catch (err) {
      console.error('Job application submission error:', err);
      const subject = encodeURIComponent(\`Job Application: \${selectedJob ? selectedJob.title : ''}\`);
      const body = encodeURIComponent(
        \`Position: \${selectedJob ? selectedJob.title : ''}\\nName: \${formName}\\nEmail: \${formEmail}\\nPhone: \${formPhone}\\nExperience: \${formExperience}\\nLocation: \${formLocation}\\n\\nMessage:\\n\${formMessage || 'None'}\`
      );
      window.location.href = \`mailto:careers@unimrkt.com?subject=\${subject}&body=\${body}\`;
      setApplyStatus('Application drafted. Please send through your email client.');
    } finally {
      setApplySubmitting(false);
    }
  };

  return (
    <section className="career-openings-section" id="open-positions">
      <div className="srcn-container">
        {(displayKicker || displayHeading || displayDesc) && (
          <header className="career-openings-header section-header-area">
            {displayKicker && <span className="career-openings-kicker career-values-kicker">{displayKicker}</span>}
            {displayHeading && <h2 className="section-main-heading">{displayHeading}</h2>}
            {displayDesc && <p className="section-sub-text">{displayDesc}</p>}
          </header>
        )}

        <form
          className="career-job-filters"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setVisibleCount(4);
          }}
        >
          <label className="career-job-search">
            <span className="visually-hidden">Search job roles</span>
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <input
              type="search"
              name="job-search"
              placeholder="Search for job roles..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(4);
              }}
            />
          </label>
          <label className="career-job-filter">
            <span>Department</span>
            <select
              name="department"
              aria-label="Filter by department"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
                setVisibleCount(4);
              }}
            >
              <option value="">All Departments</option>
              {departmentOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
          <label className="career-job-filter">
            <span>Job Type</span>
            <select
              name="job-type"
              aria-label="Filter by job type"
              value={jobType}
              onChange={(e) => {
                setJobType(e.target.value);
                setVisibleCount(4);
              }}
            >
              <option value="">All Types</option>
              {jobTypeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="career-job-filter">
            <span>Location</span>
            <select
              name="location"
              aria-label="Filter by location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setVisibleCount(4);
              }}
            >
              <option value="">All Locations</option>
              {locationOptions.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </label>
          <button className="career-job-search-submit" type="submit">
            Search
          </button>
        </form>

        <div className="career-job-list" aria-live="polite">
          {visibleJobs.map((job) => (
            <article key={job.id} className="career-job-card">
              <div className="career-job-summary">
                {jobIcon && (
                  <span className="career-job-icon">
                    <img src={jobIcon} alt="job" />
                  </span>
                )}
                <div className="career-job-main">
                  <h3>{job.title}</h3>
                  <ul className="career-job-meta">
                    {job.locationLabel && (
                      <li>
                        {locationIcon && (
                          <span>
                            <img src={locationIcon} alt="Location" />
                          </span>
                        )}{' '}
                        {job.locationLabel}
                      </li>
                    )}
                    {job.typeLabel && (
                      <li>
                        {briefcaseIcon && (
                          <span>
                            <img src={briefcaseIcon} alt="Job Type" />
                          </span>
                        )}{' '}
                        {job.typeLabel}
                      </li>
                    )}
                    {job.deptLabel && (
                      <li>
                        {userIcon && <img src={userIcon} alt="Department" />}{' '}
                        {job.deptLabel}
                      </li>
                    )}
                    {job.dateLabel && (
                      <li>
                        {calendarIcon && (
                          <span>
                            <img src={calendarIcon} alt="Date" />
                          </span>
                        )}{' '}
                        {job.dateLabel}
                      </li>
                    )}
                  </ul>
                </div>
                <div className="career-job-actions">
                  <button
                    className="career-job-details-toggle"
                    type="button"
                    onClick={() => handleOpenDetails(job)}
                  >
                    View Details
                  </button>
                  <button
                    className="career-job-apply career-job-apply-trigger"
                    type="button"
                    onClick={() => handleOpenApply(job)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <p className="career-jobs-empty">No positions match those filters. Try changing your search or selections.</p>
        )}

        {filteredJobs.length > visibleCount && (
          <button
            className="career-jobs-load-more"
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            Load More
          </button>
        )}
      </div>

      {/* Details Modal */}
      {isDetailsModalOpen && selectedJob && (
        <div
          className="career-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDetailsModalOpen(false);
          }}
        >
          <div
            className="career-modal career-details-modal open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="careerDetailsTitle"
          >
            <div className="career-modal-header">
              <div className="career-modal-job-heading">
                {jobIcon && (
                  <span className="career-job-icon">
                    <img src={jobIcon} alt="Job Position" />
                  </span>
                )}
                <div>
                  <h2 id="careerDetailsTitle">{selectedJob.title}</h2>
                  <p id="careerDetailsMeta">{selectedJob.metaText}</p>
                </div>
              </div>
              <button
                className="career-modal-close"
                type="button"
                aria-label="Close job details"
                onClick={() => setIsDetailsModalOpen(false)}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
            <div className="career-details-content">{selectedJob.description}</div>
            <div className="career-modal-footer">
              <button
                className="career-job-apply career-modal-apply"
                type="button"
                onClick={() => handleOpenApply(selectedJob)}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Application Modal */}
      {isApplyModalOpen && selectedJob && (
        <div
          className="career-modal-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsApplyModalOpen(false);
          }}
        >
          <div
            className="career-modal career-application-modal open"
            role="dialog"
            aria-modal="true"
            aria-labelledby="careerApplicationTitle"
          >
            <div className="career-modal-header">
              <div className="career-modal-title-wrap">
                <h2 id="careerApplicationTitle">Apply for {selectedJob.title}</h2>
                <p>Fill in your details below to apply for this position.</p>
              </div>
              <button
                className="career-modal-close"
                type="button"
                aria-label="Close application form"
                onClick={() => setIsApplyModalOpen(false)}
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
            <form className="career-application-form" onSubmit={handleApplicationSubmit}>
              <label className="career-application-field">
                <span>
                  Full Name <b>*</b>
                </span>
                <input
                  type="text"
                  name="Full Name"
                  placeholder="Enter your full name"
                  autoComplete="name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                  disabled={applySubmitting}
                />
              </label>
              <label className="career-application-field">
                <span>
                  Email Address <b>*</b>
                </span>
                <input
                  type="email"
                  name="Email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                  disabled={applySubmitting}
                />
              </label>
              <label className="career-application-field">
                <span>
                  Phone Number <b>*</b>
                </span>
                <input
                  type="tel"
                  name="Phone"
                  placeholder="Enter your mobile number"
                  autoComplete="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  required
                  disabled={applySubmitting}
                />
              </label>
              <label className="career-application-field">
                <span>
                  Experience (in Years) <b>*</b>
                </span>
                <select
                  name="Experience"
                  value={formExperience}
                  onChange={(e) => setFormExperience(e.target.value)}
                  required
                  disabled={applySubmitting}
                >
                  <option value="">Select experience</option>
                  <option value="Fresher">Fresher</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1-3 years">1-3 years</option>
                  <option value="3-5 years">3-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </label>
              <label className="career-application-field">
                <span>
                  Current Location <b>*</b>
                </span>
                <input
                  type="text"
                  name="Current Location"
                  placeholder="Enter your current location"
                  autoComplete="address-level2"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  required
                  disabled={applySubmitting}
                />
              </label>
              <label className="career-application-field career-application-message">
                <span>
                  Additional Message <em>(Optional)</em>
                </span>
                <textarea
                  name="Message"
                  rows="3"
                  placeholder="Tell us why you're a great fit for this role..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  disabled={applySubmitting}
                ></textarea>
              </label>
              <button
                className="career-job-apply career-application-submit"
                type="submit"
                disabled={applySubmitting}
              >
                {applySubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
              {applyStatus && (
                <p
                  className="career-application-status"
                  style={{
                    color: applyStatus.includes('successfully') ? '#16a34a' : '#d97706',
                    marginTop: '12px',
                    fontWeight: '500',
                  }}
                >
                  {applyStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
`;
fs.writeFileSync(openingsPath, openingsCode, 'utf8');
console.log('✓ CareerOpenings.jsx updated');

// 7. Update app/work/page.js
const workPagePath = path.join(__dirname, '../app/work/page.js');
let workPageCode = fs.readFileSync(workPagePath, 'utf8');
workPageCode = workPageCode
  .replace("kicker={editorialSection?.kicker || 'WHAT WE BELIEVE'}", "kicker={editorialSection?.kicker}")
  .replace("title={editorialSection?.heading || editorialSection?.title || 'Insights That Drive Smarter Business Decisions'}", "title={editorialSection?.heading || editorialSection?.title}");
fs.writeFileSync(workPagePath, workPageCode, 'utf8');
console.log('✓ app/work/page.js updated');

console.log('All Work sections cleaned successfully.');
