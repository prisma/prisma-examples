import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from '../../../lib/prisma'


const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.SMTP_FROM,
    }),
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  secret: process.env.SECRET,
  /**
   * When using GH as your Auth Provider, the email isn't returned from the response
   * Linked Issue: https://github.com/nextauthjs/next-auth/issues/374
   * Temporary patch: https://github.com/nextauthjs/next-auth/issues/374#issuecomment-931731266
   * TODO: remove the callback block when NextAuth v4 is released
   */
  callbacks: {
    signIn: async (profile, account) => {
      if (account.provider === 'github') {
        const res = await fetch('https://api.github.com/user/emails', {
          headers: { Authorization: `token ${account.accessToken}` },
        })

        const emails: any = await res.json()
        if (emails?.length > 0) {
          profile.email = emails.sort((a, b) => b.primary - a.primary)[0].email
        }

        return true
      }
    },
  }
};
