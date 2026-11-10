const {
  getTestimonials,
  getFaqs,
  getOfficeLocations,
  getTeamMembers,
  getGlobalSettings,
  getPageBySlug
} = require('../lib/strapi.js');

async function testClient() {
  console.log('Testing Strapi Client service layer...');
  
  const globals = await getGlobalSettings();
  console.log('Globals:', globals ? `siteName="${globals.siteName}", nav items=${globals.navigation?.length || 0}` : 'FAILED');

  const testimonials = await getTestimonials();
  console.log('Testimonials:', testimonials ? `Count=${testimonials.length}, first="${testimonials[0]?.title}"` : 'FAILED');

  const faqs = await getFaqs();
  console.log('FAQs:', faqs ? `Count=${faqs.length}, first="${faqs[0]?.question}"` : 'FAILED');

  const offices = await getOfficeLocations();
  console.log('Offices:', offices ? `Count=${offices.length}, first="${offices[0]?.officeName}"` : 'FAILED');

  const team = await getTeamMembers();
  console.log('Team:', team ? `Count=${team.length}, first="${team[0]?.name}"` : 'FAILED');

  const homePage = await getPageBySlug('home');
  console.log('Home Page:', homePage ? `title="${homePage.title}", sections=${homePage.sections?.length || 0}` : 'FAILED');
}

testClient();
