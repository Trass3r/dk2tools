import * as esbuild from 'esbuild';
import fs from 'fs';
import { promisify } from 'util';
const stat = fs.statSync;
import path from 'path';

const isWatch = process.argv.includes('--watch');
const isServe = process.argv.includes('--serve');
const outdir = path.resolve(process.cwd(), 'dist');

const buildOptions = {
  entryPoints: ['kmf2gltf.mjs', 'kmf2obj.mjs'],
  outdir,
  bundle: true,
  format: 'esm',
  target: ["es2024", "node22"],
  minify: !isWatch,
  //minifyWhitespace: !isWatch,
  //minifyIdentifiers: !isWatch,
  //minifySyntax: !isWatch,
  sourcemap: true,
  define: {
    'process.env.NODE_ENV': isWatch ? '"development"' : '"production"',
    'process.env.NODE_DEBUG': 'false',
    // expose a global flag JS can use to detect production vs dev for live reload
    'window.IS_PRODUCTION': isWatch ? 'false' : 'true'
  },
  logLevel: 'info'
};

const staticAssets = [
  'kmf2gltf.html',
  'kmf2obj.html',
  'StringStreamWriter.mjs',
  'DOMStreamWriter.mjs',
];

function copyModifiedFiles() {
  for (const item of staticAssets) {
    const srcPath = path.resolve(process.cwd(), item);
    const destPath = path.join(outdir, path.basename(item));

    try {
      fs.cpSync(srcPath, destPath, {
        recursive: true,
        dereference: true,
        errorOnExist: false,
        force: true,
        filter: (src) => {
          let doCopy = false;
          try {
            const rel = path.relative(srcPath, src);
            const destItem = path.join(destPath, rel);
            const sstat = fs.statSync(src);
            if (sstat.isDirectory()) return true; // always traverse directories
            try {
              const dstat = fs.statSync(destItem);
              doCopy = sstat.mtimeMs > dstat.mtimeMs || sstat.size !== dstat.size;
            } catch (e) {
              doCopy = true;
            }
          } catch (e) {
            doCopy = true;
          }
          if (doCopy)
            console.log(`Copying ${srcPath} -> ${destPath}...`);
          return doCopy;
        }
      });
      // If we copied an HTML file, inject live-reload snippet in dev mode
      if (isWatch) {
        const ext = path.extname(destPath).toLowerCase();
        if (ext === '.html') {
          try {
            injectLiveReload(destPath);
          } catch (e) {
            console.error('injectLiveReload failed:', e);
          }
        }
      }
    } catch (e) {
      console.warn(`performCopies: ${e.message}`);
    }
  }
}

function injectLiveReload(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const marker = "__ESBUILD_LIVERELOAD__";
  if (html.indexOf(marker) !== -1) return; // already injected

  const snippet = `<!-- ${marker} -->\n<script>if (!window.IS_PRODUCTION) {(function(){function connect(backoff){backoff=backoff||100;try{const s=new EventSource('/esbuild'); /* expose for beforeunload */ try{window.__esbuild_eventsource=s;}catch(_){} s.addEventListener('change',e=>{try{const d=JSON.parse(e.data||'{}');const added=d.added||[];const removed=d.removed||[];const updated=d.updated||[];if(!added.length&&!removed.length&&updated.length===1&&updated[0].endsWith('.css')){for(const link of document.getElementsByTagName('link')){try{const url=new URL(link.href);if(url.host===location.host&&url.pathname===updated[0]){const next=link.cloneNode();next.href=updated[0]+'?'+Math.random().toString(36).slice(2);next.onload=()=>link.remove();link.parentNode.insertBefore(next,link.nextSibling);return}}catch(_){}}} }catch(_){ } try{ if(s && s.close) s.close(); }catch(_){ } try{ if(window.__esbuild_eventsource) { try{window.__esbuild_eventsource=null;}catch(_){}} }catch(_){} location.reload()});s.onerror=()=>{try{ if(s && s.close) s.close(); }catch(_){ } try{ if(window.__esbuild_eventsource) { try{window.__esbuild_eventsource=null;}catch(_){}} }catch(_){} setTimeout(()=>connect(Math.min(2000,(backoff||100)*1.5)),backoff)};}catch(_){setTimeout(()=>connect(Math.min(2000,(backoff||100)*1.5)),backoff)}}connect(); /* ensure closed on manual unload to avoid noisy console errors */ try{window.addEventListener('beforeunload',()=>{try{if(window.__esbuild_eventsource) { window.__esbuild_eventsource.close(); window.__esbuild_eventsource=null;} }catch(e){} });}catch(_){} })();}</script>\n`;

  if (html.indexOf('</body>') !== -1) {
    html = html.replace(/<\/body>/i, snippet + '</body>');
  } else {
    html = html + '\n' + snippet;
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Injected esbuild live-reload into ${filePath}`);
}

function watchStaticAssets() {
  for (const item of staticAssets) {
    const srcPath = path.resolve(process.cwd(), item);
    try {
      // fs.watch with recursive works on Windows and macOS; wrap in try to avoid platform issues
      fs.watch(srcPath, { recursive: true }, (evt, fname) => {
        console.log(`Static asset change detected: ${item} ${evt} ${fname || ''}`);
        try { copyModifiedFiles(); } catch (e) { console.error('Copy step failed during watch:', e); }
      });
    } catch (e) {
      // fallback: poll periodically
      setInterval(() => {
        try { copyModifiedFiles(); } catch (e2) { /* ignore */ }
      }, 2000);
      break;
    }
  }
}

if (isWatch && isServe) {
  // Use the new context API: create a long-lived context, enable watch and serve
  (async () => {
    try {
      const ctx = await esbuild.context({
        ...buildOptions
      });

      // Start watching
      await ctx.watch();

      // Start serving the output directory
      // bind to localhost only to avoid exposing other network adapters
      const server = await ctx.serve({ servedir: outdir, host: '127.0.0.1', port: 3000 });

      // Initial copy of static assets
      try { copyModifiedFiles(); } catch (e) { console.error('Copy step failed:', e); }

      console.log('Serving', server && server.hosts ? server.hosts.join(',') : 'http://localhost', 'port', server && server.port ? server.port : 3000);
      console.log('Open http://localhost:3000/');
      console.log('Watching and serving...');
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  })();
} else if (isWatch) {
  (async () => {
    try {
      const ctx = await esbuild.context({ ...buildOptions });
      await ctx.watch();
      try { copyModifiedFiles(); } catch (e) { console.error('Copy step failed:', e); }
      console.log('Watching...');
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  })();
} else {
  esbuild.build(buildOptions).then(() => {
    try {
      copyModifiedFiles();
    } catch (e) {
      console.error('Copy step failed:', e);
    }
    console.log('Build complete.');
  }).catch((e) => { console.error(e); process.exit(1); });
}
