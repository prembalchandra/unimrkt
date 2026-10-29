/**
 * Strapi 5 Client Helper for Unimrkt Research Next.js Frontend
 */

const STRAPI_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

/**
 * Fetch data from Strapi REST API
 * @param {string} endpoint - API path (e.g. '/api/pages' or '/api/global')
 * @param {object} query - Query parameters (e.g. { populate: '*' })
 * @param {object} options - Next.js fetch options (revalidate, cache)
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

    const res = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
      next: { revalidate: options.revalidate ?? 60 }, // 60s ISR default
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
 * Fetch Global site settings (logos, navbar, footer, SEO)
 */
export async function getGlobalSettings() {
  const data = await fetchStrapi('/api/global', {
    populate: '*',
  });
  return data?.data || null;
}

/**
 * Fetch a Page by its slug with populated dynamic zone sections
 * @param {string} slug - Page slug (e.g. 'home', 'about', 'automotives')
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
 * @param {object} pageData - Strapi page object
 * @param {string} componentName - e.g. 'sections.home-hero', 'sections.hero-common'
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
 * Fetch all Case Studies
 */
export async function getCaseStudies(limit = 10) {
  const data = await fetchStrapi('/api/case-studies', {
    populate: '*',
    'pagination[limit]': limit,
  });
  return data?.data || [];
}

/**
 * Fetch all Blogs
 */
export async function getBlogPosts(limit = 10) {
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
export async function getTeamMembers(limit = 20) {
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
export async function getIndustries(limit = 20) {
  const data = await fetchStrapi('/api/industries', {
    populate: '*',
    'pagination[limit]': limit,
  });
  return data?.data || [];
}

/**
 * Fetch all Services
 */
export async function getServices(limit = 20) {
  const data = await fetchStrapi('/api/services', {
    populate: '*',
    'pagination[limit]': limit,
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
