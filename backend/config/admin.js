module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'admin-secret-unimrkt-fallback'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'token-salt-unimrkt-fallback'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'transfer-salt-unimrkt-fallback'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [
        'http://localhost:1440',
        'http://127.0.0.1:1440',
        'http://localhost:1337',
        'http://127.0.0.1:1337',
      ],
      async handler(uid, { documentId, locale, status }) {
        const clientUrl = env('CLIENT_URL', 'http://localhost:1440');
        try {
          if (uid === 'api::page.page') {
            const doc = await strapi.documents('api::page.page').findOne({
              documentId,
              fields: ['slug'],
            });
            const slug = doc?.slug || '';
            const path = (slug === 'home' || !slug) ? '' : slug;
            return `${clientUrl}/${path}`;
          }
          if (uid === 'api::blog.blog') {
            const doc = await strapi.documents('api::blog.blog').findOne({
              documentId,
              fields: ['slug'],
            });
            const slug = doc?.slug || '';
            return `${clientUrl}/blog-details?slug=${slug}`;
          }
          if (uid === 'api::case-study.case-study') {
            const doc = await strapi.documents('api::case-study.case-study').findOne({
              documentId,
              fields: ['slug'],
            });
            const slug = doc?.slug || '';
            return `${clientUrl}/case-study-details?slug=${slug}`;
          }
          if (uid === 'api::service.service') {
            return `${clientUrl}/services`;
          }
          if (uid === 'api::industry.industry') {
            return `${clientUrl}/industries`;
          }
          if (uid === 'api::career-job.career-job') {
            return `${clientUrl}/career`;
          }
          if (uid === 'api::team-member.team-member') {
            return `${clientUrl}/team`;
          }
          if (uid === 'api::gallery-item.gallery-item') {
            return `${clientUrl}/gallery`;
          }
        } catch (err) {
          strapi.log.error('Preview handler error: ' + err.message);
        }
        return clientUrl;
      },
    },
  },
});
