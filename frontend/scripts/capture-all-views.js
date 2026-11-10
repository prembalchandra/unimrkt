const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9272;
const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-screens-'));
const outDir = 'C:\\Users\\Helpdesk\\.gemini\\antigravity\\brain\\5018ff38-4817-40bb-8afa-87cdf26304e7';

const pagesToCapture = [
  { slug: 'home', url: '/' },
  { slug: 'about', url: '/about' },
  { slug: 'our-company', url: '/our-company' },
  { slug: 'services', url: '/services' },
  { slug: 'industries', url: '/industries' },
  { slug: 'contact', url: '/contact' },
  { slug: 'work', url: '/work' },
  { slug: 'primary-research', url: '/primary-research' },
  { slug: 'telephonic-surveys', url: '/telephonic-surveys' },
];

async function capture() {
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

  for (const p of pagesToCapture) {
    const tabRes = await fetch('http://127.0.0.1:' + debuggingPort + '/json/new?' + encodeURIComponent('http://localhost:1440' + p.url), { method: 'PUT' });
    const tab = await tabRes.json();
    const ws = new globalThis.WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve) => {
      let id = 1;
      const call = (method, params = {}) => new Promise(res => {
        const cur = id++;
        const handler = (evt) => {
          const msg = JSON.parse(evt.data);
          if (msg.id === cur) {
            ws.removeEventListener('message', handler);
            res(msg.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: cur, method, params }));
      });

      ws.onopen = async () => {
        await call('Page.enable');
        await new Promise(res => setTimeout(res, 2500));
        const screenshot = await call('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(outDir, `view_${p.slug}.png`), Buffer.from(screenshot.data, 'base64'));
        console.log(`Saved view_${p.slug}.png`);
        ws.close();
        resolve();
      };
    });
  }

  edge.kill();
  console.log('All screenshots captured!');
}

capture().catch(console.error);
