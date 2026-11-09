import { INITIAL_RESOURCES } from "@/lib/data";

// Where this copy of the app is served; see the same setting in layout.tsx.
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": `${siteUrl}`,
        "name": "DevShelf",
        "description": "High-performance search engine indexing 1M+ open-source developer tutorials, project templates, and code repositories.",
        "publisher": {
          "@type": "Person",
          "name": "Anas"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "DataCatalog",
        "@id": `${siteUrl}/#catalog`,
        "name": "DevShelf Open-Source Learning Index",
        "description": "Comprehensive index catalog of over 1,000,000 developer tutorials, open source repositories, and technical guides.",
        "url": `${siteUrl}`,
        "provider": {
          "@type": "Organization",
          "name": "DevShelf Inc.",
          "founder": {
            "@type": "Person",
            "name": "Anas"
          }
        },
        "dataset": {
          "@type": "Dataset",
          "name": "DevShelf Global Index",
          "description": "Over 1,000,000 verified code repositories, system design guides, and tutorials.",
          "license": "https://opensource.org/licenses/MIT",
          "isAccessibleForFree": true,
          "variableMeasured": ["Difficulty", "Category", "GitHub Stars", "Tags"]
        }
      },
      {
        "@type": "ItemPage",
        "@id": `${siteUrl}/#itempage`,
        "name": "DevShelf Discovery Portal",
        "mainEntity": {
          "@type": "ItemList",
          "name": "Featured Open Source Resources",
          "numberOfItems": 1048576,
          "itemListElement": INITIAL_RESOURCES.slice(0, 10).map((resource, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "SoftwareSourceCode",
              "name": resource.title,
              "description": resource.description,
              "codeRepository": resource.url,
              "programmingLanguage": resource.tags.map((t) => t.replace("#", "")).join(", "),
              "author": {
                "@type": "Person",
                "name": resource.author || "Open Source Contributor"
              },
              "dateCreated": resource.createdAt
            }
          }))
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

