import { PrismaClient } from '@prisma/client'
import { PrismaPlanetScale } from '@prisma/adapter-planetscale'
import { Client } from '@planetscale/database'
import { Request. ExecutionContext} from "@cloudflare/workers-types"

type Env = {
	DATABASE_URL: string
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const client = new Client({
      url: env.DATABASE_URL,
      // see https://github.com/cloudflare/workerd/issues/698
      fetch(url, init) {
        delete init['cache']
        return fetch(url, init)
      },
    })
    const adapter = new PrismaPlanetScale(client)
    const prisma = new PrismaClient({ adapter })

    const users = await prisma.user.findMany()
    const result = JSON.stringify(users)
    return new Response(result)
  },
}
