async function verify() {
  const blogRes = await fetch('http://localhost:1440/blog/ai-and-the-workforce-in-transformation-disruption-opportunity');
  const blogHtml = await blogRes.text();
  console.log('--- BLOG ROUTE ---');
  console.log('HTTP Status:', blogRes.status);
  console.log('Title present:', blogHtml.includes('AI and the Workforce'));
  console.log('Author present:', blogHtml.includes('Dr. Aris Thorne'));
  console.log('Content block present:', blogHtml.includes('In 2026, artificial intelligence is no longer just an emerging tool'));
  console.log('Tag present:', blogHtml.includes('Artificial Intelligence'));
  console.log('JSON-LD schema present:', blogHtml.includes('BlogPosting'));
  console.log('Quick Inquiry form present:', blogHtml.includes('Quick Inquiry'));

  const csRes = await fetch('http://localhost:1440/case-study/understanding-customer-expectations-financial-market');
  const csHtml = await csRes.text();
  console.log('\n--- CASE STUDY ROUTE ---');
  console.log('HTTP Status:', csRes.status);
  console.log('Title present:', csHtml.includes('Understanding Customer Expectations in a Changing Financial Market'));
  console.log('Client name present:', csHtml.includes('Global Tier-1 Commercial'));
  console.log('Testimonial quote present:', csHtml.includes('Unimrkt brought strong research expertise'));
  console.log('Challenge heading present:', csHtml.includes('Financial Expectations Were Changing Faster Than Ever'));
  console.log('Approach title present:', csHtml.includes('Multi-Country Qualitative'));
  console.log('Impact heading present:', csHtml.includes('Actionable Insights That Transformed Customer Strategy'));
  console.log('JSON-LD schema present:', csHtml.includes('Article'));
}

verify().catch(console.error);
