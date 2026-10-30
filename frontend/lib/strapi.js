/**
 * Strapi 5 Client Helper for Unimrkt Research Next.js Frontend
 */

export const STRAPI_URL = process.env.STRAPI_API_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';

/**
 * Safely resolve an image/media URL from Strapi media object or path
 * Handles Strapi 5 format, Strapi 4 format, direct URL strings, and fallbacks.
 *
 * @param {object|string|null} media - Strapi media object, URL string, or null
 * @param {string} fallback - Default local fallback image path
 * @returns {string} Fully resolved image URL
 */
export function getStrapiMediaUrl(media, fallback = '') {
  if (!media) return fallback;

  // Case 1: String already provided
  if (typeof media === 'string') {
    if (media.startsWith('http://') || media.startsWith('https://')) {
      return media;
    }
    if (media.startsWith('/uploads/')) {
      return `${STRAPI_URL}${media}`;
    }
    return media; // e.g. local /asstes/... path
  }

  // Case 2: Strapi 5 media object: { url: '/uploads/xyz.png', formats: { ... } }
  let url = media.url;

  // Case 3: Strapi 4 media object: { data: { attributes: { url: ... } } }
  if (!url && media.data) {
    url = media.data.attributes?.url || media.data.url;
  }
  if (!url && media.attributes) {
    url = media.attributes.url;
  }

  if (!url) return fallback;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `${STRAPI_URL}${url.startsWith('/') ? url : `/${url}`}`;
}

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

    const isDev = process.env.NODE_ENV !== 'production';
    const fetchOptions = isDev
      ? { cache: 'no-store', ...options }
      : { next: { revalidate: options.revalidate ?? 60 }, ...options };

    const res = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
      signal: AbortSignal.timeout(5000),
      ...fetchOptions,
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
export async function getCaseStudies(limit = 20) {
  const data = await fetchStrapi('/api/case-studies', {
    populate: '*',
    'pagination[limit]': limit,
  });
  return data?.data || [];
}

/**
 * Fetch single Case Study by slug
 */
export async function getCaseStudyBySlug(slug) {
  const data = await fetchStrapi('/api/case-studies', {
    'filters[slug][$eq]': slug,
    populate: '*',
  });
  return data?.data?.[0] || null;
}

/**
 * Fetch all Blogs
 */
export async function getBlogPosts(limit = 30) {
  const data = await fetchStrapi('/api/blogs', {
    populate: '*',
    'pagination[limit]': limit,
    sort: 'publishedAt:desc',
  });
  return data?.data || [];
}

/**
 * Fetch single Blog by slug
 */
export async function getBlogBySlug(slug) {
  const data = await fetchStrapi('/api/blogs', {
    'filters[slug][$eq]': slug,
    populate: '*',
  });
  return data?.data?.[0] || null;
}

/**
 * Fetch all Team Members
 */
export async function getTeamMembers(limit = 30) {
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
 * Fetch all Gallery Items
 */
export async function getGalleryItems(limit = 30) {
  const data = await fetchStrapi('/api/gallery-items', {
    populate: '*',
    'pagination[limit]': limit,
    sort: 'order:asc',
  });
  return data?.data || [];
}

/**
 * Fetch all Career Jobs
 */
export async function getCareerJobs(limit = 20) {
  const data = await fetchStrapi('/api/career-jobs', {
    populate: '*',
    'pagination[limit]': limit,
    sort: 'createdAt:desc',
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

/**
 * Generate Next.js dynamic metadata for any page from Strapi SEO
 */
export async function generatePageMetadata(slug, fallbackTitle = '', fallbackDesc = '') {
  try {
    const page = await getPageBySlug(slug);
    const seo = page?.seo;
    const title = seo?.metaTitle || (page?.title ? `${page.title} | Unimrkt Research` : fallbackTitle);
    const description = seo?.metaDescription || fallbackDesc;
    const keywords = seo?.keywords ? seo.keywords.split(',').map((k) => k.trim()) : [];
    const canonical = seo?.canonicalURL || `/${slug === 'home' ? '' : slug}`;
    const ogImage = seo?.metaImage ? getStrapiMediaUrl(seo.metaImage) : '/asstes/images/unimrkt-resarch-map-banner-img.webp';

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: `https://www.unimrkt.com${canonical}`,
        siteName: 'Unimrkt Research',
        locale: 'en_US',
        type: 'website',
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [ogImage],
      },
    };
  } catch {
    return {
      title: fallbackTitle,
      description: fallbackDesc,
    };
  }
}
