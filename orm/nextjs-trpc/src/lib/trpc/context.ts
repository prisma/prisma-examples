import type { NextRequest } from "next/server";

export async function createContext(req: NextRequest) {
    return {
        session: null,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
