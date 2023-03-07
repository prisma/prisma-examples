import type { ActionArgs, LoaderArgs, MetaFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { marked } from "marked";
import { json } from "react-router";
import { prisma } from '~/lib/prisma.server'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return {
      title: "Post not found",
    }
  }

  return {
    title: data.post.published ? data.post.title : `${data.post.title} (Draft)`,
  }
}


export async function action({ request, params }: ActionArgs) {
  const id = params.id

  switch (request.method) {
    case "PUT":
      await prisma.post.update({
        where: {
          id: Number(id)
        },
        data: {
          published: true,
        }
      })
      return redirect('/')
    case "DELETE":
      await prisma.post.delete({
        where: {
          id: Number(id)
        }
      })
      return redirect('/');
    default:
      return null;
  }
}

export async function loader({ params }: LoaderArgs) {
  const id = params.id

  if (typeof id === 'undefined') {
    throw new Response("id not found", { status: 400 })
  }

  const post = await prisma.post.findUnique({
    where: {
      id: Number(id)
    },
    select: {
      id: true,
      title: true,
      published: true,
      content: true,
      author: true,
    }
  })

  if (!post) {
    throw new Response("Post not found", { status: 400 })
  }

  const postContenthtml = post.content ? marked(post.content) : ""

  const updatedPost = {
    ...post,
    content: postContenthtml
  }
  return json({ post: updatedPost })
}


export default function Post() {
  const { post } = useLoaderData<typeof loader>()

  return (
    <div>
      <h2>{post.title}</h2>
      <p>By {post?.author?.name || 'Unknown author'}</p>
      <article dangerouslySetInnerHTML={{ __html: post.content }} />
      <div style={{ display: 'flex', }}>
        {!post.published && (
          <Form method="put">
            <button type="submit" value="publish" name="_publish" className="button">
              Publish
            </button>
          </Form>
        )}
        <Form method="delete">
          <button type="submit" value="delete" name="_delete" className="button ml-10">
            Delete
          </button>
        </Form>
      </div>
    </div>
  )
}