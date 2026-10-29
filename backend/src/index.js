'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   */
  async bootstrap({ strapi }) {
    try {
      // Ensure "Admin" custom role exists in Users & Permissions
      const pluginStore = strapi.plugin('users-permissions');
      if (pluginStore) {
        const roleService = pluginStore.service('role');
        if (roleService) {
          const roles = await roleService.getRoles();
          const hasAdminRole = roles.some(
            (r) => r.name.toLowerCase() === 'admin'
          );

          if (!hasAdminRole) {
            await roleService.createRole({
              name: 'Admin',
              description: 'Administrator role for Next.js Admin portal',
              type: 'admin',
              permissions: {},
            });
            strapi.log.info('Successfully created "Admin" role in Users & Permissions.');
          }
        }
      }
    } catch (err) {
      strapi.log.warn('Users & Permissions auto-role initialization notice:', err.message);
    }
  },
};
