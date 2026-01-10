#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { SourceMapConsumer } = require('source-map');

function parseStackLines(text) {
  const lines = (text || '').split('\n');
  const frames = [];
  const re = /at .*?\(?(.+?):(\d+):(\d+)\)?$/;
  for (const l of lines) {
    const m = l.match(re);
    if (m) frames.push({ url: m[1], line: Number(m[2]), column: Number(m[3]), raw: l });
  }
  return frames;
}

async function mapFrame(frame) {
  const url = frame.url;
  if (!url) return { frame };
  // find asset file name
  const asset = path.basename(url.split('?')[0]);
  const mapPath = path.resolve(process.cwd(), 'dist', 'public', 'assets', asset + '.map');
  if (!fs.existsSync(mapPath)) return { frame, mapped: null, reason: 'no map file' };
  const raw = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const consumer = await new SourceMapConsumer(raw);
  const orig = consumer.originalPositionFor({ line: frame.line, column: frame.column });
  consumer.destroy();
  return { frame, mapped: orig };
}

(async () => {
  const capPath = path.resolve(process.cwd(), 'captures', 'capture.json');
  if (!fs.existsSync(capPath)) { console.error('capture.json not found'); process.exit(1); }
  const capture = JSON.parse(fs.readFileSync(capPath, 'utf8'));
  const results = [];
  for (const entry of capture) {
    if (entry.type === 'console' || entry.type === 'pageerror') {
      const text = entry.text || entry.message || '';
      const frames = parseStackLines(text);
      const mapped = [];
      for (const f of frames) mapped.push(await mapFrame(f));
      results.push({ entry, frames: mapped });
    }
  }

  fs.writeFileSync(path.resolve(process.cwd(), 'captures', 'mapped.json'), JSON.stringify(results, null, 2));
  console.log('Wrote captures/mapped.json');
})();