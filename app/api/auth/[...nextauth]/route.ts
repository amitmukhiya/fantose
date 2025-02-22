// imports
import NextAuth from "next-auth"

// importing providers
//import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          }),
          
    ],secret: process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }