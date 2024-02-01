import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
      clientId: "1651937501999025",
      clientSecret: "3c1deff27a4caa6221fa3b6352dfe79e",
    })
  ]
}

export default NextAuth(authOptions)