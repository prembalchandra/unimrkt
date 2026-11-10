const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9268;
const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-audit-net-'));

const routes = [
  '/', '/about', '/our-company', '/services', '/primary-research',
  '/telephonic-surveys', '/industries', '/automotives', '/case-study',
  '/case-study-details', '/blog', '/blog-details', '/team', '/gallery',
  '/faq', '/work', '/contact', '/privacy-policy'
];

async function run() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--user-data-dir=' + tempProfile,
    '--window-size=1440,1200',
    '--disable-gpu',
    '--no-sandbox',
    'about:blank'
  ]);

  for (let i = 0; i < 20; i++) {
    try {
      await fetch('http://127.0.0.1:' + debuggingPort + '/json/version');
      break;
    } catch (e) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  for (const r of routes) {
    const tabRes = await fetch('http://127.0.0.1:' + debuggingPort + '/json/new?' + encodeURIComponent('http://localhost:1440' + r), { method: 'PUT' });
    const tab = await tabRes.json();
    const ws = new globalThis.WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve) => {
      let id = 1;
      const failedUrls = [];
      const consoleErrors = [];
      const call = (method, params = {}) => new Promise(res => {
        const cur = id++;
        const handler = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.method === 'Network.responseReceived' && msg.params?.response?.status >= 400) {
            failedUrls.push({ url: msg.params.response.url, status: msg.params.response.status });
          }
          if (msg.method === 'Runtime.consoleAPICalled' && msg.params?.type === 'error') {
            consoleErrors.push(JSON.stringify(msg.params.args));
          }
          if (msg.id === cur) {
            ws.removeEventListener('message', handler);
            res(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: cur, method, params }));
      });

      ws.onopen = async () => {
        await call('Network.enable');
        await call('Page.enable');
        await new Promise(res => setTimeout(res, 2500));

        const bodyHeight = await call('Runtime.evaluate', { expression: 'document.body.scrollHeight' });
        const secCount = await call('Runtime.evaluate', { expression: 'document.querySelectorAll("section").length' });

        console.log(`Route: ${r.padEnd(20)} | H: ${bodyHeight?.result?.value} | Secs: ${secCount?.result?.value} | 404s: ${failedUrls.length} | Errors: ${consoleErrors.length}`);
        if (failedUrls.length > 0) {
          console.log('   Failed URLs:', failedUrls.slice(0, 3).map(f => `${f.status} ${f.url}`).join(' | '));
        }
        if (consoleErrors.length > 0) {
          console.log('   Console Errors:', consoleErrors.slice(0, 2).join(' | '));
        }

        ws.close();
        resolve();
      };
    });
  }

  edge.kill();
  console.log('Done audit!');
}

run().catch(console.error);
