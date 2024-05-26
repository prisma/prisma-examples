import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { PulseSubscription, withPulse } from '@prisma/extension-pulse'
import { Client } from 'typesense'
import { upgradeWebSocket } from 'hono/cloudflare-workers'

// Initialize Prisma Client with Accelerate extension
const initPrismaClient = (databaseUrl: string) => {
  return new PrismaClient({
    datasourceUrl: databaseUrl,
  }).$extends(withAccelerate())
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
  console.log({ body })
  const response = new Request(url, { method, headers, body })
  return response?.json() ?? null
}

// Create TypeSense collection if not exists
const createTypeSenseCollection = async (
  typeSenseAdminAPI: string,
  data: any,
) => {
  const url = 'https://xxx.a1.typesense.net:443/collections'
  return sendTypeSenseRequest(url, 'POST', typeSenseAdminAPI, data)
}

// Add document to TypeSense collection
const addTypeSenseDocument = async (typeSenseAdminAPI: string, data: any) => {
  const url = 'https://xxx.a1.typesense.net:443/collections/products/documents'
  return sendTypeSenseRequest(url, 'POST', typeSenseAdminAPI, data)
}

// Update document in TypeSense collection
const updateTypeSenseDocument = async (
  typeSenseAdminAPI: string,
  data: any,
) => {
  const url = `https://xxx.a1.typesense.net:443/collections/products/documents?filter_by=id:=${data.id}`
  return sendTypeSenseRequest(url, 'PATCH', typeSenseAdminAPI, data)
}

// Delete document from TypeSense collection
const deleteTypeSenseDocument = async (
  typeSenseAdminAPI: string,
  id: number,
) => {
  const url = `https://xxx.a1.typesense.net:443/collections/products/documents/filter_by=id:=${id}`
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
}

const app = new Hono<{ Bindings: Bindings }>()

// Utility function to handle TypeSense product changes
const handleProductChanges = async (
  env: Bindings,
  getProductChanges: PulseSubscription<any>,
) => {
  await createTypeSenseCollection(env.TYPESENSE_ADMIN_API_KEY, {
    name: 'products',
    fields: [
      { name: 'id', type: 'int32', facet: false },
      { name: 'name', type: 'string', facet: false },
      { name: 'description', type: 'string', facet: false },
      { name: 'stock', type: 'int32', facet: false },
    ],
    default_sorting_field: 'id',
  })

  for await (const item of getProductChanges) {
    switch (item.action) {
      case 'create': {
        const data = await addTypeSenseDocument(
          env.TYPESENSE_ADMIN_API_KEY,
          item.created,
        )
        console.log(data)
        break
      }
      case 'update': {
        const data = await updateTypeSenseDocument(
          env.TYPESENSE_ADMIN_API_KEY,
          item.after,
        )
        console.log(data)
        break
      }
      case 'delete': {
        const data = await deleteTypeSenseDocument(
          env.TYPESENSE_ADMIN_API_KEY,
          item.deleted.id,
        )
        console.log(data)
        break
      }
    }
  }
}

// Test route
app.get('/test', async (c) => {
  const prisma = addPulseExtension(
    initPrismaClient(c.env.DATABASE_URL),
    c.env.PULSE_API_KEY,
  )

  const getProductChanges = await prisma.product.stream({
    name: 'product-changes',
    create: {},
    update: {},
    delete: {},
  })

  await handleProductChanges(c.env, getProductChanges)

  return c.json({})
})

// WebSocket route
const ws = app.get(
  '/ws',
  upgradeWebSocket((c) => {
    c.executionCtx.waitUntil(
      (async () => {
        const prisma = addPulseExtension(
          initPrismaClient(c.env.DATABASE_URL),
          c.env.PULSE_API_KEY,
        )

        const getProductChanges = await prisma.product.stream({
          name: 'product-changes',
          create: {},
          update: {},
          delete: {},
        })

        await createTypeSenseCollection(c.env.TYPESENSE_ADMIN_API_KEY, {
          name: 'products',
          fields: [
            { name: 'id', type: 'int32', facet: false },
            { name: 'name', type: 'string', facet: false },
            { name: 'description', type: 'string', facet: false },
            { name: 'stock', type: 'int32', facet: false },
          ],
          default_sorting_field: 'id',
        })

        for await (const item of getProductChanges) {
          switch (item.action) {
            case 'create':
              console.log(item)
              try {
                await addTypeSenseDocument(
                  c.env.TYPESENSE_ADMIN_API_KEY,
                  item.created,
                )
              } catch (error) {
                console.log(error)
              }
              break
            case 'update':
              console.log(item)
              try {
                await updateTypeSenseDocument(
                  c.env.TYPESENSE_ADMIN_API_KEY,
                  item.after,
                )
              } catch (error) {
                console.log(error)
              }
              break
            case 'delete':
              console.log(item)
              try {
                await deleteTypeSenseDocument(
                  c.env.TYPESENSE_ADMIN_API_KEY,
                  item.deleted.id,
                )
              } catch (error) {
                console.log(error)
              }
              break
          }
        }
      })(),
    )

    return {
      onOpen: () => {
        console.log('New connection made to server.')
      },
      onMessage: (event) => {
        console.log(event.data)
      },
    }
  }),
)

export type WebSocketApp = typeof ws

// Root route
app.get('/', async (c) => {
  const prisma = initPrismaClient(c.env.DATABASE_URL)
  return c.json(await prisma.product.findFirst())
})

app.get('/page', async (c) => {
  return c.html(`<div>Hellp</div>`)
})

export default app
