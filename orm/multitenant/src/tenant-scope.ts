import { PrismaClient } from '../prisma/generated/index.js'

/**
 * Returns a Prisma `where` clause that always scopes queries to a single tenant.
 * Merge with any additional conditions using object spread.
 *
 * @example
 * // Fetch only this tenant's pending orders
 * const orders = await prisma.order.findMany({
 *   where: {
 *     ...tenantWhere(tenantId),
 *     status: 'PENDING',
 *   },
 * })
 */
export function tenantWhere(tenantId: string): { tenantId: string } {
  return { tenantId }
}

/**
 * Throws if `resource.tenantId` does not match the requesting `tenantId`.
 * Call this after any `findUnique` / `findFirst` that fetches by a non-tenant
 * key (e.g. by `id` or `reference`) to prevent cross-tenant information leaks.
 *
 * @example
 * const order = await prisma.order.findUnique({ where: { id: orderId } })
 * assertTenantAccess(order, currentTenantId)  // throws if wrong tenant
 */
export function assertTenantAccess(
  resource: { tenantId: string } | null,
  tenantId: string,
  resourceName = 'resource',
): asserts resource is { tenantId: string } {
  if (!resource) {
    throw new Error(`${resourceName} not found`)
  }
  if (resource.tenantId !== tenantId) {
    throw new Error(`Access denied: ${resourceName} belongs to a different tenant`)
  }
}

/**
 * A thin PrismaClient extension that automatically adds `tenantId` to every
 * query on tenant-scoped models. This is a convenience wrapper — you can also
 * use `tenantWhere()` / `assertTenantAccess()` directly.
 *
 * Usage:
 *   const db = createTenantClient(prisma, tenantId)
 *   const orders = await db.order.findMany()  // always scoped to tenantId
 */
export function createTenantClient(prisma: PrismaClient, tenantId: string) {
  return prisma.$extends({
    query: {
      order: {
        async findMany({ args, query }) {
          args.where = { ...args.where, tenantId }
          return query(args)
        },
        async findFirst({ args, query }) {
          args.where = { ...args.where, tenantId }
          return query(args)
        },
        async count({ args, query }) {
          args.where = { ...args.where, tenantId }
          return query(args)
        },
        async create({ args, query }) {
          args.data = { ...args.data, tenantId }
          return query(args)
        },
        async updateMany({ args, query }) {
          args.where = { ...args.where, tenantId }
          return query(args)
        },
        async deleteMany({ args, query }) {
          args.where = { ...args.where, tenantId }
          return query(args)
        },
      },
      user: {
        async findMany({ args, query }) {
          args.where = { ...args.where, tenantId }
          return query(args)
        },
        async findFirst({ args, query }) {
          args.where = { ...args.where, tenantId }
          return query(args)
        },
        async create({ args, query }) {
          args.data = { ...args.data, tenantId }
          return query(args)
        },
      },
    },
  })
}
