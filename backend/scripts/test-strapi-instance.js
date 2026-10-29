const { createStrapi } = require('@strapi/core');

async function run() {
  const strapi = await createStrapi({ distDir: './dist', appDir: process.cwd() }).load();
  console.log('Strapi loaded programmatically!');
  const pages = await strapi.documents('api::page.page').findMany();
  console.log('Found pages count:', pages.length);
  await strapi.destroy();
}

run().catch(console.error);
