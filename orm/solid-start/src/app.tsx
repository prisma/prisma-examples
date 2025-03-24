import './app.css'
import { createResource, For, Show } from 'solid-js'
import { User, Post } from '@prisma/client'

type UserWithPosts = User & {
  posts: Post[]
}

const fetchUsers = async () => {
  const res = await fetch('http://localhost:3000/api/users')
  return res.json()
}

export default function App() {
  const [users, { mutate, refetch }] =
    createResource<UserWithPosts[]>(fetchUsers)

  return (
    <main>
      <h1>SolidJS + Prisma</h1>
      <Show when={!users.loading} fallback={<p>Loading...</p>}>
        <Show when={!users.error} fallback={<p>Error loading data</p>}>
          <For each={users()}>
            {(user) => (
              <div>
                <h3>{user.name}</h3>
                <For each={user.posts}>{(post) => <p>{post.title}</p>}</For>
              </div>
            )}
          </For>
        </Show>
      </Show>
    </main>
  )
}
