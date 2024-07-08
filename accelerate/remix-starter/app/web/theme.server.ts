import { createCookie, redirect } from "@remix-run/node";

export type ThemeType = "dark" | "light" | "system";

const themeCookie = createCookie("theme", {
  sameSite: "lax",
  maxAge: 604_800, // one week,
});

export async function getCurrentTheme(request: Request): Promise<ThemeType> {
  const cookieHeader = request.headers.get("Cookie");
  const currentValue = await themeCookie.parse(cookieHeader);

  if (currentValue === "dark" || currentValue === "light") return currentValue;

  return "system";
}

export async function setTheme(request: Request): Promise<Response> {
  const desiredTheme = (await request.formData()).get("theme");
  const redirectUrl = request.headers.get("Referer") || "/";

  if (
    typeof desiredTheme === "string" &&
    !["dark", "light", "system"].includes(desiredTheme)
  ) {
    // Let's not do anything if the theme is invalid
    return redirect(redirectUrl);
  }

  return redirect(redirectUrl, {
    headers: {
      "Set-Cookie": await themeCookie.serialize(desiredTheme),
    },
  });
}
