import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useRef, useEffect } from "react";
import { json } from "react-router";

import { prisma } from '~/lib/prisma.server'
import signupStyleSheet from "~/styles/signup.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: signupStyleSheet }];
};

export async function action({ request }: ActionArgs) {

  const formData = await request.formData()
  const title = formData.get("title")
  const content = formData.get("content")
  const authorEmail = formData.get("email")


  if (typeof title !== "string") {
    return json(
      { errors: { name: "Title is required", email: null } },
      { status: 400 }
    )
  }

  if (typeof authorEmail !== "string" || authorEmail.length < 3 || !authorEmail.includes("@")) {
    return json(
      { errors: { name: null, email: "Email is invalid" } },
      { status: 400 }
    )
  }

  await prisma.post.create({
    data: {
      title,
      content: content ? String(content) : null,
      author: { connect: { email: authorEmail } }
    }
  })

  return redirect("/drafts")
}

export default function Signup() {
  const actionData = useActionData<typeof action>()
  const titleRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.emailRef) {
      emailRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="page">
      <Form method="post">
        <h1>Signup user</h1>
        <div>
          <input
            autoFocus
            ref={titleRef}
            placeholder="Title"
            name="title"
            type="text"
            aria-invalid={actionData?.errors?.title ? true : undefined}
          />
          {actionData?.errors?.title && (
            <div id="title-error">
              {actionData.errors.title}
            </div>
          )}
        </div>
        <div>
          <input
            placeholder="Author (email address)"
            ref={emailRef}
            name="email"
            type="email"
            aria-invalid={actionData?.errors?.email ? true : undefined}
          />
          {actionData?.errors?.email && (
            <div id="email-error">
              {actionData.errors.email}
            </div>
          )}
          <div>
            <textarea
              autoFocus
              placeholder="Content"
              name="content"
            />
          </div>
        </div>
        <input
          type="submit"
          value="Create"
        />
        <Link className="back ml-10" to="/">
          or Cancel
        </Link>
      </Form>
    </div>
  )
}