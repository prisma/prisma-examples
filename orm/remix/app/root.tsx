import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import Header from '~/components/Header'
import type { LinksFunction } from '@remix-run/node';
import globalStylesheet from "~/styles/global.css"

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStylesheet }];
};

export const meta: MetaFunction = () => ([{
  charset: "utf-8",
  title: "Remix 💚 Prisma",
  viewport: "width=device-width,initial-scale=1",
}]);


export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="layout">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
