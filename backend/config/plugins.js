module.exports = ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', 'users-permissions-default-secret-unimrkt-2026'),
      jwt: {
        expiresIn: '7d',
      },
      ratelimit: {
        interval: 60000,
        max: 10,
      },
    },
  },
});
