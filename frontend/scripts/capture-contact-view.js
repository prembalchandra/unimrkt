const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9260;
const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-verify-figma-contact-'));
const outPath = 'C:\\Users\\Helpdesk\\.gemini\\antigravity\\brain\\5018ff38-4817-40bb-8afa-87cdf26304e7\\figma_contact_integrated.png';

async function capture() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--user-data-dir=' + tempProfile,
    '--window-size=1440,3000',
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

  const tabRes = await fetch('http://127.0.0.1:' + debuggingPort + '/json/new?' + encodeURIComponent('http://localhost:1440/contact'), { method: 'PUT' });
  const tab = await tabRes.json();
  const ws = new globalThis.WebSocket(tab.webSocketDebuggerUrl);

  await new Promise((resolve) => {
    let id = 1;
    const call = (method, params = {}) => new Promise(r => {
      const cur = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === cur) {
          ws.removeEventListener('message', handler);
          r(msg.result);
        }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: cur, method, params }));
    });

    ws.onopen = async () => {
      await call('Page.enable');
      await new Promise(r => setTimeout(r, 3500));
      const screenshot = await call('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(outPath, Buffer.from(screenshot.data, 'base64'));
      console.log('Saved screenshot to:', outPath);
      edge.kill();
      resolve();
    };
  });
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
