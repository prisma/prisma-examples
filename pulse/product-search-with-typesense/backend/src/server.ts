import { Context, Hono, Handler } from 'hono'
import { PrismaClient } from '@prisma/client'
import { withPulse } from '@prisma/extension-pulse'
import { z } from 'zod'
import { HTTPException } from 'hono/http-exception'
import { cors } from 'hono/cors'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const productSchema = z.object({
  title: z
    .string()
    .min(2, 'A product title is required, with atleast 2 characters.'),
  description: z
    .string()
    .min(4, 'A product description is required, with atleast 4 characters.'),
  stock: z.coerce.number().min(1, 'Atleast 1 item should be in stock!'),
})

// Initialize Prisma Client with the pg driver adapter
const initPrismaClient = (databaseUrl: string) => {
  const pool = new Pool({ connectionString: databaseUrl })
  const adapter = new PrismaPg(pool)
  const prisma = new PrismaClient({ adapter })
  return prisma
}

// Helper function to send requests to TypeSense
const sendTypeSenseRequest = async (
  url: string,
  method: string,
  typeSenseAdminAPI: string,
  data?: any,
) => {
  const headers = {
    'Content-Type': 'application/json',
    'X-TYPESENSE-API-KEY': typeSenseAdminAPI,
  }

  const body = data ? JSON.stringify(data) : undefined
  const response = await fetch(url, { method, headers, body })
  return response?.json() ?? null
}

// Create TypeSense collection if not exists
const createTypeSenseCollection = async (
  typesenseUrl: string,
  typeSenseAdminAPI: string,
  data: any,
) => {
  const url = `${typesenseUrl}/collections`

  const result = await sendTypeSenseRequest(
    url,
    'POST',
    typeSenseAdminAPI,
    data,
  )

  return result
}

// Add document to TypeSense collection
const addTypeSenseDocument = async (
  typesenseUrl: string,
  typeSenseAdminAPI: string,
  data: any,
) => {
  const url = `${typesenseUrl}/collections/products/documents`

  return sendTypeSenseRequest(url, 'POST', typeSenseAdminAPI, data)
}

// Update document in TypeSense collection
const updateTypeSenseDocument = async (
  typesenseUrl: string,
  typeSenseAdminAPI: string,
  data: any,
) => {
  const url = `${typesenseUrl}/collections/products/documents?filter_by=id:=${data.id}`

  return sendTypeSenseRequest(url, 'PATCH', typeSenseAdminAPI, data)
}

// Delete document from TypeSense collection
const deleteTypeSenseDocument = async (
  typesenseUrl: string,
  typeSenseAdminAPI: string,
  id: number,
) => {
  const url = `${typesenseUrl}/collections/products/documents?filter_by=id:=${id}`

  return sendTypeSenseRequest(url, 'DELETE', typeSenseAdminAPI)
}

// Extend Prisma Client with Pulse extension
const addPulseExtension = (
  db: ReturnType<typeof initPrismaClient>,
  pulseAPIKey: string,
) => {
  return db.$extends(
    withPulse({
      apiKey: pulseAPIKey,
    }),
  )
}

// Bindings type definition
type Bindings = {
  DATABASE_URL: string
  PULSE_API_KEY: string
  TYPESENSE_ADMIN_API_KEY: string
  TYPESENSE_URL: string
}

const app = new Hono<{ Bindings: Bindings }>()

app.use(cors())

const updateTypesense = async (env: Bindings) => {
  // create typesense collection if it doesn't exist
  await createTypeSenseCollection(
    env.TYPESENSE_URL,
    env.TYPESENSE_ADMIN_API_KEY,
    {
      name: 'products',
      fields: [
        { name: 'id', type: 'int32', facet: false },
        { name: 'name', type: 'string', facet: false },
        { name: 'description', type: 'string', facet: false },
        { name: 'stock', type: 'int32', facet: false },
      ],
    },
  )

  const primsa = addPulseExtension(
    initPrismaClient(env.DATABASE_URL),
    env.PULSE_API_KEY,
  )

  // Listen to all the changes to products by listening to the "product-changes" group.
  const productStream = await primsa.product.stream({
    name: 'product-changes',
    create: {},
    update: {},
    delete: {},
  })

  const FIVE_MINUTES = 5 * 60 * 1000

  let timeoutId: NodeJS.Timeout

  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      console.log('No events for 5 minutes. Terminating stream.')

      productStream.stop()

      throw Error('No events for 5 minutes.') // Or use another method to break the loop in your environment
    }, FIVE_MINUTES)
  }

  resetTimeout() // Start the timeout for the first time

  for await (const item of productStream) {
    try {
      resetTimeout() // Reset the timeout on each new event
    } catch (error) {
      break
    }

    switch (item.action) {
      case 'create': {
        console.log('Pulse create event')
        console.log(item)

        try {
          console.log('Creating document in Typesense')
          const result = await addTypeSenseDocument(
            env.TYPESENSE_URL,
            env.TYPESENSE_ADMIN_API_KEY,
            { ...item.created, id: `${item.created.id}` },
          )

          console.log(result)
        } catch (error) {
          console.log(error)
        }

        break
      }
      case 'update': {
        console.log('Pulse update event')
        console.log(item)

        try {
          console.log('Updating document in Typesense')
          const result = await updateTypeSenseDocument(
            env.TYPESENSE_URL,
            env.TYPESENSE_ADMIN_API_KEY,
            item.after,
          )

          console.log({ result })
        } catch (error) {
          console.log(error)
        }

        break
      }
      case 'delete': {
        console.log('Pulse delete event')
        console.log(item)

        try {
          console.log('Deleting document in Typesense')
          const result = await deleteTypeSenseDocument(
            env.TYPESENSE_URL,
            env.TYPESENSE_ADMIN_API_KEY,
            item.deleted.id,
          )

          console.log({ result })
        } catch (error) {
          console.log(error)
        }

        break
      }
    }
  }
}

app.post('/add-product', async (c) => {
  const data = await c.req.json()

  const parsedData = await productSchema.spa(data)

  const prisma = initPrismaClient(c.env.DATABASE_URL)

  if (parsedData.error) {
    const errorResponse = new Response(JSON.stringify(parsedData.error), {
      status: 400,
    })

    throw new HTTPException(401, { res: errorResponse })
  }

  const result = await prisma.product.create({
    data: { ...parsedData.data },
  })

  return c.json(result)
})

// Root route
app.get('/', async (c) => {
  const prisma = initPrismaClient(c.env.DATABASE_URL)
  const data = await prisma.product.findFirst()
  return c.json({
    message: 'The server is running!',
    data: data,
  })
})

export default {
  fetch: app.fetch,
  scheduled: async (_: any, env: Bindings, ctx: ExecutionContext) => {
    ctx.waitUntil(updateTypesense(env))
  },
}
