const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9295;
const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-admin-inspect-'));

async function inspectAdmin() {
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

  const tabRes = await fetch('http://127.0.0.1:' + debuggingPort + '/json/new?' + encodeURIComponent('http://localhost:1337/admin/'), { method: 'PUT' });
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
      await call('Runtime.enable');
      await new Promise(r => setTimeout(r, 4000)); // wait for admin render

      const evalRes = await call('Runtime.evaluate', {
        expression: `
          (() => {
            const el = document.body;
            const computed = window.getComputedStyle(el);
            const buttons = Array.from(document.querySelectorAll('button')).map(b => ({
              text: b.innerText,
              bg: window.getComputedStyle(b).backgroundColor,
              color: window.getComputedStyle(b).color,
              className: b.className
            }));
            const links = Array.from(document.querySelectorAll('a')).map(a => ({
              text: a.innerText,
              color: window.getComputedStyle(a).color
            }));
            const title = document.title;
            const url = window.location.href;
            return { title, url, buttonsCount: buttons.length, buttons: buttons.slice(0, 10), links: links.slice(0, 5) };
          })()
        `,
        returnByValue: true
      });

      console.log('Admin DOM Info:', evalRes.result.value);

      const shot = await call('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync('C:\\Users\\Helpdesk\\.gemini\\antigravity\\brain\\5018ff38-4817-40bb-8afa-87cdf26304e7\\admin_view.png', Buffer.from(shot.data, 'base64'));
      console.log('Saved admin screenshot to admin_view.png');

      ws.close();
      edge.kill();
      resolve();
    };
  });
}

inspectAdmin().catch(console.error);
