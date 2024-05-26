import { hc } from 'hono/client'
import { WebSocketApp } from './server'

const client = hc<WebSocketApp>('http://localhost:8787')

const ws = client.ws.$ws(0)

ws.addEventListener('open', () => {
  setInterval(() => {
    ws.send('Hello')
  }, 5000)
})
