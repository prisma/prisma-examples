import './app.css'
import { createResource, For, Show } from 'solid-js'
import { User, Post } from '@prisma/client'
import Socials from './components/socials'

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
    <main class="w-full flex flex-col items-center justify-center my-16 max-w-lg mx-auto space-y-16">
      <h1 class="text-blue-600 uppercase text-6xl w-fit font-thin leading-tight mx-auto">
        SolidJS + Prisma
      </h1>
      <div class="w-full flex flex-col items-center justify-center gap-4">
        <Show when={!users.loading} fallback={<p>Loading...</p>}>
          <Show when={!users.error} fallback={<p>Error loading data</p>}>
            <For each={users()}>
              {(user) => (
                <div class="w-full p-4 border rounded-md">
                  <h3 class="text-xl font-bold">{user.name}</h3>
                  <For each={user.posts}>
                    {(post) => (
                      <div class="w-full gap-2">
                        <a
                          href={post.content ?? ''}
                          class="text-blue-600 hover:underline"
                        >
                          {post.title}
                        </a>
                      </div>
                    )}
                  </For>
                </div>
              )}
            </For>
          </Show>
        </Show>
      </div>
      <Socials />
    </main>
  )
}
