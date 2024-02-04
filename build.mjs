import * as esbuild from 'esbuild'

await esbuild.build({
  entryPoints: ['kmf2gltf.mjs'],
  bundle: true,
  outdir: 'dist',
  //outfile: 'kmf2gltf.js',
  format: 'esm',
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.NODE_DEBUG': 'false'
  }
})
