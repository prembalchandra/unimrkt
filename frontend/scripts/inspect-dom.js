const { spawn } = require('child_process');
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const debuggingPort = 9271;
const tempProfile = require('fs').mkdtempSync(require('path').join(require('os').tmpdir(), 'edge-dom-'));

async function test() {
  const edge = spawn(edgePath, [
    '--headless=new',
    '--remote-debugging-port=' + debuggingPort,
    '--user-data-dir=' + tempProfile,
    '--window-size=1440,1200',
    '--disable-gpu',
    '--no-sandbox',
    'about:blank'
  ]);
  await new Promise(r => setTimeout(r, 1000));
  const tabRes = await fetch('http://127.0.0.1:' + debuggingPort + '/json/new?' + encodeURIComponent('http://localhost:1440/about'), { method: 'PUT' });
  const tab = await tabRes.json();
  const ws = new globalThis.WebSocket(tab.webSocketDebuggerUrl);
  ws.onopen = async () => {
    let id = 1;
    const call = (method, params = {}) => new Promise(res => {
      const cur = id++;
      const handler = (evt) => {
        const msg = JSON.parse(evt.data);
        if (msg.id === cur) { ws.removeEventListener('message', handler); res(msg.result); }
      };
      ws.addEventListener('message', handler);
      ws.send(JSON.stringify({ id: cur, method, params }));
    });
    await call('Page.enable');
    await new Promise(r => setTimeout(r, 2000));

    const htmlLen = await call('Runtime.evaluate', { expression: 'document.documentElement.outerHTML.length' });
    const mainHtml = await call('Runtime.evaluate', { expression: 'document.querySelector("main") ? document.querySelector("main").outerHTML.slice(0, 500) : "no main"' });
    const visibleSecs = await call('Runtime.evaluate', { expression: '[...document.querySelectorAll("section")].map(s => ({ cls: s.className, h: s.offsetHeight, w: s.offsetWidth }))' });

    console.log('outerHTML length in Edge:', htmlLen?.result?.value);
    console.log('main in Edge:', mainHtml?.result?.value);
    console.log('sections in Edge:', visibleSecs?.result?.value);
    ws.close();
    edge.kill();
  };
}
test().catch(console.error);
