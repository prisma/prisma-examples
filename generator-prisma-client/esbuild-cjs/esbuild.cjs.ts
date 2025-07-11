import esbuild, { type BuildOptions } from 'esbuild'

const buildOpts = {
  bundle: true,
  sourcemap: true,
  entryPoints: ['./src/hono.ts', './src/minimal.ts'],
  outdir: './dist',
  outExtension: {
    '.js': '.cjs',
  },
  format: 'cjs',
  target: 'es2022',
  platform: 'node',
  
  // To make it work with Prisma 6.11, you would need to use the following condition:
  // ```
  // conditions: ['require']
  // ```
} satisfies BuildOptions

async function build() {
  await esbuild.build(buildOpts);
}

build()
