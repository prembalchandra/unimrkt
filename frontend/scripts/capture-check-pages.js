const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9295;
const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-all-views-'));
const outDir = 'C:\\Users\\Helpdesk\\.gemini\\antigravity\\brain\\5018ff38-4817-40bb-8afa-87cdf26304e7';

const routes = [
  { name: 'check_home', url: '/' },
  { name: 'check_services', url: '/services' },
  { name: 'check_our_company', url: '/our-company' },
  { name: 'check_contact', url: '/contact' },
  { name: 'check_about', url: '/about' }
];

async function captureAll() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--user-data-dir=' + tempProfile,
    '--window-size=1440,1080',
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
    const tabRes = await fetch('http://127.0.0.1:' + debuggingPort + '/json/new?' + encodeURIComponent('http://localhost:1440' + r.url), { method: 'PUT' });
    const tab = await tabRes.json();
    const ws = new globalThis.WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve) => {
      let id = 1;
      const call = (method, params = {}) => new Promise(res => {
        const msgId = id++;
        const handler = (event) => {
          const d = JSON.parse(event.data);
          if (d.id === msgId) {
            ws.removeEventListener('message', handler);
            res(d.result);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });

      ws.onopen = async () => {
        await call('Page.enable');
        await call('DOM.enable');
        await new Promise(res => setTimeout(res, 2000));

        const shot = await call('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(outDir, `${r.name}.png`), Buffer.from(shot.data, 'base64'));
        console.log(`Saved ${r.name}.png`);
        ws.close();
        resolve();
      };
    });
  }

  edge.kill();
  console.log('Finished capturing pages.');
}

captureAll().catch(console.error);
