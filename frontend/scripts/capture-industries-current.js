const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9288;
const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-industries-'));
const outDir = 'C:\\Users\\Helpdesk\\.gemini\\antigravity\\brain\\5018ff38-4817-40bb-8afa-87cdf26304e7';

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

  const tabRes = await fetch('http://127.0.0.1:' + debuggingPort + '/json/new?' + encodeURIComponent('http://localhost:1440/industries'), { method: 'PUT' });
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
      await new Promise(r => setTimeout(r, 3000)); // wait for full render

      // Get page layout metrics for full page screenshot
      const metrics = await call('Page.getLayoutMetrics');
      const width = Math.ceil(metrics.contentSize.width);
      const height = Math.ceil(metrics.contentSize.height);

      await call('Emulation.setDeviceMetricsOverride', {
        width,
        height,
        deviceScaleFactor: 1,
        mobile: false
      });

      const shot = await call('Page.captureScreenshot', {
        format: 'png',
        captureBeyondViewport: true
      });

      const outPath = path.join(outDir, 'current_industries_full.png');
      fs.writeFileSync(outPath, Buffer.from(shot.data, 'base64'));
      console.log('Saved screenshot to:', outPath);
      ws.close();
      edge.kill();
      resolve();
    };
  });
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
