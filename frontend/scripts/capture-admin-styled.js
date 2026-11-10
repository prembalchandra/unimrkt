const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9297;
const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-admin-view-2-'));
const outDir = 'C:\\Users\\Helpdesk\\.gemini\\antigravity\\brain\\5018ff38-4817-40bb-8afa-87cdf26304e7';

async function capture() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--user-data-dir=' + tempProfile,
    '--window-size=1440,900',
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

  const tabRes = await fetch('http://127.0.0.1:' + debuggingPort + '/json/new?' + encodeURIComponent('http://localhost:1337/admin/auth/login'), { method: 'PUT' });
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

    ws.onmessage = (event) => {
      const d = JSON.parse(event.data);
      if (d.method === 'Runtime.consoleAPICalled') {
        console.log('Console:', d.params.type, d.params.args.map(a => a.value || a.description));
      }
      if (d.method === 'Runtime.exceptionThrown') {
        console.error('Exception:', d.params.exceptionDetails);
      }
    };

    ws.onopen = async () => {
      await call('Page.enable');
      await call('Runtime.enable');

      // Wait 8 seconds
      await new Promise(r => setTimeout(r, 8000));

      const evalRes = await call('Runtime.evaluate', { expression: 'document.location.href' });
      console.log('Current URL:', evalRes.result.value);

      const titleRes = await call('Runtime.evaluate', { expression: 'document.title' });
      console.log('Document title:', titleRes.result.value);

      const htmlLen = await call('Runtime.evaluate', { expression: 'document.body.innerHTML.length' });
      console.log('HTML body length:', htmlLen.result.value);

      const screenshot = await call('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(path.join(outDir, 'admin_styled_view.png'), Buffer.from(screenshot.data, 'base64'));
      console.log('Admin screenshot saved to:', path.join(outDir, 'admin_styled_view.png'));

      edge.kill();
      resolve();
    };
  });
}

capture().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
