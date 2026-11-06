const { getBlogPosts, getIndustries } = require('../lib/strapi');

async function test() {
  const blogs = await getBlogPosts(3);
  console.log('Blogs from Strapi:');
  blogs.forEach(b => {
    console.log(' - Title:', b.title);
    console.log('   featuredImage:', b.featuredImage);
    console.log('   coverImage:', b.coverImage);
    console.log('   image:', b.image);
  });

  const inds = await getIndustries(4);
  console.log('\nIndustries from Strapi:');
  inds.forEach(ind => {
    console.log(' - Title:', ind.title);
    console.log('   featuredImage:', ind.featuredImage);
    console.log('   image:', ind.image);
    console.log('   icon:', ind.icon);
  });
}

test().catch(console.error);
