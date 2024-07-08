import { SerializeFrom } from "@remix-run/node";
import { useRouteLoaderData } from "@remix-run/react";
import { loader } from "~/root";

export type RootLoaderType = SerializeFrom<Awaited<ReturnType<typeof loader>>>;

export function useRootLoaderData() {
  return useRouteLoaderData<RootLoaderType>("root")!;
}
