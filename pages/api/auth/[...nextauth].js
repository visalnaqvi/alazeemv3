import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      // clientId: "280196164904-33db2ciu7p73eca5ebk75ejtvdp6vs3l.apps.googleusercontent.com",
      // clientSecret: "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",

      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
      // httpOptions: {
      //   timeout: 5000
      // }
    }),
  ]
}
export default NextAuth(authOptions)