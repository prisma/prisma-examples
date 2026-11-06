import { INITIAL_RESOURCES } from "@/lib/data";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://devshelf.io/#website",
        "url": "https://devshelf.io",
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
            "urlTemplate": "https://devshelf.io/?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "DataCatalog",
        "@id": "https://devshelf.io/#catalog",
        "name": "DevShelf Open-Source Learning Index",
        "description": "Comprehensive index catalog of over 1,000,000 developer tutorials, open source repositories, and technical guides.",
        "url": "https://devshelf.io",
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
        "@id": "https://devshelf.io/#itempage",
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

