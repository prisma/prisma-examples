import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient();

export const { signIn, signUp, signOut } = authClient;
