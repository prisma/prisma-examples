/**
 * @flow
 */
import { prisma } from './generated'

// A `main` function so that we can use async/await
async function main() {
  const result = await prisma
    .cat({ id: 'cjky74byofp1n0b07ux4038oe' })
    .favBrother()

  console.log(result)
}

main().catch(e => console.error(e))
