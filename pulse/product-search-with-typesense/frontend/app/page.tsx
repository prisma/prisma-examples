import { ProductDialog } from '@/components/ProductForm'
import { ProductSearch } from '../components/ProductSearch'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center pt-16 pl-16 pr-16">
        <h1 className="text-2xl font-bold">
          Welcome to the Typesense + Prisma Pulse product search exmple app 🔎
        </h1>
        <p className="p-4">
        This app lets you add products to your database and automatically syncs them with the TypeSense server every 15 minutes using Prisma Pulse, allowing you to search for the added products easily.
        </p>
      </div>
      <ProductDialog />
      <ProductSearch />
    </div>
  )
}
