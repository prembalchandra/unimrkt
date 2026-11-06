async function check() {
  try {
    const res = await fetch('http://localhost:1440/industries');
    console.log('Status:', res.status);
    const html = await res.text();
    // search for error
    const match = html.match(/<pre[^>]*>([\s\S]*?)<\/pre>/i) || html.match(/class="nextjs__container_errors[^>]*>([\s\S]*?)<\/div>/i);
    if (match) {
      console.log('Error:', match[1].slice(0, 1000));
    } else {
      console.log('No pre tag, snippet:');
      console.log(html.slice(0, 800));
    }
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

check();
