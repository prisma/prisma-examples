import "./root.css";

import { unstable_defineLoader } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import acceptLanguage from "accept-language-parser";
import React, { useEffect } from "react";
import { GLOBAL_ENV } from "./env/globalEnv";
import { useRootLoaderData } from "./hooks/useRootLoaderData";
import { cn } from "./utils";
import { getCurrentTheme } from "./web/theme.server";

// Load the locale from the Accept-Language header to later
// inject it on the app's context
function localeFromRequest(request: Request): string {
  const languages = acceptLanguage.parse(
    request.headers.get("Accept-Language") as string,
  );

  // If somehow the header is empty, return a default locale
  if (languages?.length < 1) return "en-us";

  // If there is no region for this locale, just return the country code
  if (!languages[0].region) return languages[0].code;

  return `${languages[0].code}-${languages[0].region.toLowerCase()}`;
}

export const loader = unstable_defineLoader(async ({ request }) => {
  return {
    locale: localeFromRequest(request),
    ENV: GLOBAL_ENV,
    rootTime: new Date().toISOString(),
    currentTheme: await getCurrentTheme(request),
  };
});

function applySystemTheme() {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const cl = document.documentElement.classList;

  cl.add(theme);
}

const applySystemThemeString = `
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";
  const cl = document.documentElement.classList;

  cl.add(theme);
`;

export default function App() {
  const { ENV, currentTheme } = useRootLoaderData();

  useEffect(() => {
    if (currentTheme === "system") applySystemTheme();
  }, [currentTheme]);

  return (
    <Document className={currentTheme}>
      <script
        // Set the variables for our `envVars` modules
        dangerouslySetInnerHTML={{
          __html: `window.ENV = ${JSON.stringify(ENV)};

          // Only apply the system theme if there's nothing on the cookie
          ${currentTheme === "system" ? applySystemThemeString : ""}`,
        }}
      />

      <Outlet />
    </Document>
  );
}

/**
 * This will render errors without env vars or any locale
 * info unfortunately as errors can happen on the root loader.
 */
export function ErrorBoundary() {
  return (
    <Document>
      <div></div>
    </Document>
  );
}

function Document({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <React.StrictMode>
      <html
        className={cn(className, "bg-background text-foreground")}
        lang="en"
      >
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          {title ? <title>{title}</title> : null}
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </React.StrictMode>
  );
}
