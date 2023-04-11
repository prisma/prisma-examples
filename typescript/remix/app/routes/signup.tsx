import type { ActionArgs, LinksFunction } from "@remix-run/node";
import { redirect, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { useRef, useEffect } from "react";

import { prisma } from '~/lib/prisma.server'
import signupStyleSheet from "~/styles/signup.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: signupStyleSheet }];
};

export async function action({ request }: ActionArgs) {

  const formData = await request.formData()
  const name = formData.get("name")
  const email = formData.get("email")

  if (typeof name !== "string") {
    return json(
      { errors: { name: "Name is required", email: null } },
      { status: 400 }
    )
  }

  if (typeof email !== "string" || email.length < 3 || !email.includes("@")) {
    return json(
      { errors: { name: null, email: "Email is invalid" } },
      { status: 400 }
    )
  }

  await prisma.user.create({
    data: {
      name,
      email
    }
  })

  return redirect("/")
}

export default function Signup() {
  const actionData = useActionData<typeof action>()
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (actionData?.errors?.name) {
      nameRef.current?.focus();
    } else if (actionData?.errors?.password) {
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
            ref={nameRef}
            placeholder="Name"
            name="name"
            type="text"
            aria-invalid={actionData?.errors?.name ? true : undefined}
          />
          {actionData?.errors?.name && (
            <div id="name-error">
              {actionData.errors.name}
            </div>
          )}
        </div>
        <div>
          <input
            placeholder="Email address"
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

        </div>
        <input
          type="submit"
          value="Signup"
        />
        <Link className="back ml-10" to="/">
          or Cancel
        </Link>
      </Form>
    </div>
  )
}
