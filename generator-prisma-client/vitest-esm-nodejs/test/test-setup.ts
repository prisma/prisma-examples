import { execa } from 'execa'

export async function setup() {
  console.log('Running Prisma DB push...')
  await execa('pnpm', ['prisma', 'db', 'push'], {
    stdio: 'inherit',
    cwd: process.cwd(),
  })
  console.log('Test database setup completed')
}
