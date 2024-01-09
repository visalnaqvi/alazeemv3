import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      // clientId: "280196164904-33db2ciu7p73eca5ebk75ejtvdp6vs3l.apps.googleusercontent.com",
      // clientSecret: "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",

      clientId: "241629842019-rljjn8s373nal6jdvl8bjo1sgju0a7ba.apps.googleusercontent.com",
      clientSecret: "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"

    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, 
}
export default NextAuth(authOptions)