const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9259;
const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-our-company-'));
const outDir = 'C:\\Users\\Helpdesk\\.gemini\\antigravity\\brain\\5018ff38-4817-40bb-8afa-87cdf26304e7';

async function captureUrl(url, outName) {
  const tabRes = await fetch('http://127.0.0.1:' + debuggingPort + '/json/new?' + encodeURIComponent(url), { method: 'PUT' });
  const tab = await tabRes.json();
  const ws = new globalThis.WebSocket(tab.webSocketDebuggerUrl);

  return new Promise((resolve) => {
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
      await new Promise(r => setTimeout(r, 4000));
      await call('Runtime.evaluate', { expression: 'window.scrollTo(0, document.body.scrollHeight/2);' });
      await new Promise(r => setTimeout(r, 1000));
      await call('Runtime.evaluate', { expression: 'window.scrollTo(0, 0);' });
      await new Promise(r => setTimeout(r, 1000));

      const screenshot = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
      fs.writeFileSync(path.join(outDir, outName), Buffer.from(screenshot.data, 'base64'));
      console.log('Saved:', outName);
      ws.close();
      resolve();
    };
  });
}

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

  console.log('Capturing staging /our-company...');
  await captureUrl('https://stagingunimrkt.roimantra-dev.in/our-company', 'staging_our_company_full.png');
  console.log('Capturing local /our-company...');
  await captureUrl('http://localhost:1440/our-company', 'local_our_company_integrated.png');

  edge.kill();
  console.log('Done capturing our-company!');
}

run().catch(console.error);
