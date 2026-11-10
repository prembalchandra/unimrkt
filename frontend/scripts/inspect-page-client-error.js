const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9269;
const tempProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'edge-debug-err-'));

async function inspectError(page) {
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

  const tabRes = await fetch('http://127.0.0.1:' + debuggingPort + '/json/new?' + encodeURIComponent('http://localhost:1440/' + page), { method: 'PUT' });
  const tab = await tabRes.json();
  const ws = new globalThis.WebSocket(tab.webSocketDebuggerUrl);

  await new Promise((resolve) => {
    let id = 1;
    const call = (method, params = {}) => new Promise(res => {
      const cur = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.method === 'Runtime.exceptionThrown') {
          console.log('\nEXCEPTION THROWN on /' + page + ':');
          console.log(msg.params.exceptionDetails);
        }
        if (msg.method === 'Runtime.consoleAPICalled') {
          console.log('\nCONSOLE on /' + page + ' [' + msg.params.type + ']:', msg.params.args.map(a => a.value || a.description).join(' '));
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
      await call('Runtime.enable');
      await call('Page.enable');
      await new Promise(res => setTimeout(res, 4000));
      ws.close();
      resolve();
    };
  });

  edge.kill();
}

inspectError('about').catch(console.error);
