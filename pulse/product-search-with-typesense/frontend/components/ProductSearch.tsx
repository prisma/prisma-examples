'use client'
import 'instantsearch.css/themes/satellite.css'
import { environmentVariables } from '@/lib/variables'
import {
  InstantSearch,
  SearchBox,
  Configure,
  Hits,
  Pagination,
} from 'react-instantsearch'
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter'

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    nodes: [
      {
        host: environmentVariables.TYPESENSE_HOST,
        port: 443,
        protocol: 'https',
      },
    ],
    apiKey: environmentVariables.TYPESENSE_API_KEY,
    logLevel: 'INFO',
  },
  additionalSearchParameters: {
    query_by: 'title, description',
  },
  collectionSpecificSearchParameters: {
    products: {
      query_by: 'title, description',
    },
  },
})

type ProductHit = {
  hit: {
    title: string
    description: string
    stock: number
  }
}

export function ProductSearch() {
  const Hit = ({ hit }: ProductHit) => {
    return (
      <div className="hit">
        <div className="hit-image"></div>
        <div className="hit-content">
          <h2 className="hit-title font-bold">{hit.title}</h2>
          <h3 className="hit-description">{hit.description}</h3>
          <br />
          <h4>
            <span className="font-light">Stock</span>:{' '}
            <span
              className={`font-light ${
                hit.stock > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {hit.stock}
            </span>
          </h4>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center p-8">
      <h2>🔎 Search Products 👇</h2>
      <br />
      <div className="w-[75%] flex flex-col gap-4 items-center">
        <InstantSearch
          indexName="products"
          searchClient={typesenseInstantsearchAdapter.searchClient}
          future={{
            preserveSharedStateOnUnmount: true,
          }}
        >
          <SearchBox className="w-full " autoFocus></SearchBox>
          <Pagination />
          <Configure hitsPerPage={10} />
          <Hits hitComponent={Hit} />
          <div className="h-16 w-full"></div>
        </InstantSearch>
      </div>
    </div>
  )
}
