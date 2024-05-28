const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany()
  const products = [
    {
      title: 'Wireless Mouse',
      description: 'A high precision wireless mouse',
      stock: 150,
    },
    {
      title: 'Mechanical Keyboard',
      description: 'A durable mechanical keyboard with RGB lighting',
      stock: 80,
    },
    {
      title: 'Noise Cancelling Headphones',
      description: 'Headphones with active noise cancellation',
      stock: 120,
    },
    {
      title: '4K Monitor',
      description: 'A 27-inch 4K Ultra HD monitor',
      stock: 60,
    },
    {
      title: 'Portable SSD',
      description: 'A 1TB portable SSD with fast transfer speeds',
      stock: 200,
    },
    {
      title: 'Gaming Chair',
      description: 'An ergonomic gaming chair with lumbar support',
      stock: 40,
    },
    {
      title: 'USB-C Hub',
      description: 'A multi-port USB-C hub for laptops',
      stock: 300,
    },
    {
      title: 'Smartwatch',
      description: 'A smartwatch with fitness tracking features',
      stock: 90,
    },
    {
      title: 'Bluetooth Speaker',
      description: 'A portable Bluetooth speaker with powerful sound',
      stock: 110,
    },
    {
      title: 'Webcam',
      description: 'A high-definition webcam for video conferencing',
      stock: 75,
    },
  ]

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  })

  console.log('Seed data inserted successfully')
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
