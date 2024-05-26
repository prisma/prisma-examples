async function test() {
  const url = 'https://xxx.a1.typesense.net:443/collections/products/documents'
  const apiKey = '6Vt87T8mnU54RQKOFatjxooSuOQBnT4j'

  const result = new Request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-TYPESENSE-API-KEY': apiKey,
    },
    body: JSON.stringify({
      id: 1,
      name: 'Gaming mouse best',
      description: "It's simply the bestest",
      stock: 4,
    }),
  })

  const ans = await result.json()
  console.log(ans)
}

test().then(() => console.log('Hello'))
