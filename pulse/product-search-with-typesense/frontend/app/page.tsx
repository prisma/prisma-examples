import { ProductDialog } from '@/components/ProductForm'
import { ProductSearch } from '../components/ProductSearch'

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="text-center pt-16 pl-16 pr-16">
        <h1 className="text-2xl font-bold">
          Typesense cloudflare product search 🔎
        </h1>
        <p className="p-4">
          This app lets you add products to your database and uses Prisma Pulse
          to automatically sync them to TypeSense every 10 minutes for searching
          products.
        </p>
      </div>
      <ProductDialog />
      <ProductSearch />
    </div>
  )
}
