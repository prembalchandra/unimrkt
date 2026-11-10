/**
 * Strapi 5 Centralized API Service Layer for Unimrkt Research Next.js Frontend
 * Handles all dynamic database communication with MySQL through Strapi 5 REST APIs.
 */

const STRAPI_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

/**
 * Helper to build absolute Strapi Media URL
 */
export function getStrapiMedia(media, fallback = '') {
  if (!media) return fallback;
  const url = media.url || media.attributes?.url || (typeof media === 'string' ? media : null);
  if (!url) return fallback;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

/**
 * Core fetch utility for Strapi REST API
 * Supports ISR revalidation, error resilience, and query parameter serialization.
 */
export async function fetchStrapi(endpoint, query = {}, options = {}) {
  try {
    const url = new URL(`${STRAPI_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`);

    // Build URL search parameters
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        url.searchParams.append(key, JSON.stringify(value));
      } else if (value !== undefined) {
        url.searchParams.append(key, value);
      }
    });

    const isDev = process.env.NODE_ENV === 'development';
    const res = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(8000),
      ...(isDev ? { cache: 'no-store' } : { next: { revalidate: options.revalidate ?? 60 } }),
      ...options,
    });

    if (!res.ok) {
      console.warn(`Strapi fetch warning [${res.status}] for ${endpoint}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Strapi connection error for ${endpoint}:`, err.message);
    return null;
  }
}

/**
 * Fetch Global site settings (logos, navbar, footer columns, contact details, social links, SEO)
 */
export async function getGlobalSettings() {
  const data = await fetchStrapi('/api/global', {
    'populate[navigation][populate]': '*',
    'populate[headerCta][populate]': '*',
    'populate[footerColumns][populate]': '*',
    'populate[socialLinks][populate]': '*',
    'populate[legalLinks][populate]': '*',
    'populate[headerLogo][populate]': '*',
    'populate[footerLogo][populate]': '*',
    'populate[footerCertificationLogos][populate]': '*',
    'populate[defaultSeo][populate]': '*',
  });
  return data?.data || null;
}

/**
 * Fetch a Page by its slug with populated dynamic zone sections and SEO
 */
export async function getPageBySlug(slug) {
  const data = await fetchStrapi('/api/pages', {
    'filters[slug][$eq]': slug,
    'populate[sections][populate]': '*',
    'populate[seo][populate]': '*',
  });
  return data?.data?.[0] || null;
}

/**
 * Find a specific section inside page dynamic zone sections
 */
export function findSection(pageData, componentName) {
  if (!pageData || !Array.isArray(pageData.sections)) return null;
  return pageData.sections.find((s) => s.__component === componentName) || null;
}

/**
 * Find all sections of a specific component type
 */
export function findSections(pageData, componentName) {
  if (!pageData || !Array.isArray(pageData.sections)) return [];
  return pageData.sections.filter((s) => s.__component === componentName);
}

/**
 * Fetch Testimonials from MySQL via Strapi
 */
export async function getTestimonials(limit = 20) {
  const data = await fetchStrapi('/api/testimonials', {
    populate: '*',
    'pagination[limit]': limit,
    sort: 'order:asc',
  });
  return data?.data || [];
}

/**
 * Fetch FAQs from MySQL via Strapi
 */
export async function getFaqs({ category = null, pageSlug = null, limit = 50 } = {}) {
  const query = {
    'pagination[limit]': limit,
    sort: 'order:asc',
  };
  if (category && category !== 'All') {
    query['filters[category][$eq]'] = category;
  }
  if (pageSlug) {
    query['filters[pageSlug][$eq]'] = pageSlug;
  }

  const data = await fetchStrapi('/api/faqs', query);
  return data?.data || [];
}

/**
 * Fetch Office Locations
 */
export async function getOfficeLocations(limit = 10) {
  const data = await fetchStrapi('/api/office-locations', {
    'pagination[limit]': limit,
    sort: 'order:asc',
  });
  return data?.data || [];
}

/**
 * Fetch all Case Studies
 */
export async function getCaseStudies(limit = 50) {
  const data = await fetchStrapi('/api/case-studies', {
    populate: '*',
    'pagination[limit]': limit,
  });
  return data?.data || [];
}

/**
 * Fetch all Blogs
 */
export async function getBlogPosts(limit = 50) {
  const data = await fetchStrapi('/api/blogs', {
    populate: '*',
    'pagination[limit]': limit,
    sort: 'publishedAt:desc',
  });
  return data?.data || [];
}

/**
 * Fetch all Team Members
 */
export async function getTeamMembers(limit = 50) {
  const data = await fetchStrapi('/api/team-members', {
    populate: '*',
    'pagination[limit]': limit,
    sort: 'order:asc',
  });
  return data?.data || [];
}

/**
 * Fetch all Industries
 */
export async function getIndustries(limit = 50) {
  const data = await fetchStrapi('/api/industries', {
    populate: '*',
    'pagination[limit]': limit,
  });
  return data?.data || [];
}

/**
 * Fetch all Services
 */
export async function getServices(limit = 50) {
  const data = await fetchStrapi('/api/services', {
    populate: '*',
    'pagination[limit]': limit,
  });
  return data?.data || [];
}

/**
 * Fetch Career Jobs
 */
export async function getCareerJobs(limit = 20) {
  const data = await fetchStrapi('/api/career-jobs', {
    populate: '*',
    'pagination[limit]': limit,
  });
  return data?.data || [];
}

/**
 * Fetch Gallery Items
 */
export async function getGalleryItems(limit = 50) {
  const data = await fetchStrapi('/api/gallery-items', {
    populate: '*',
    'pagination[limit]': limit,
    sort: 'order:asc',
  });
  return data?.data || [];
}

/**
 * Submit Contact Inquiry to Strapi
 */
export async function submitContactInquiry(formData) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/contact-submissions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: formData }),
    });
    return await res.json();
  } catch (err) {
    console.error('Contact submission error:', err);
    throw err;
  }
}
