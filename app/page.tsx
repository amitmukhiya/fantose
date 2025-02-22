'use client'
import AuthFormContainer from "./authFormContainer";
import { useSession} from "next-auth/react"
//import { useSession, signIn, signOut } from "next-auth/react"

import { redirect } from 'next/navigation'

export default function Home() {
  const { data: session } = useSession()
  
  if(session){
    console.log(session);
  }else{
    console.log('noooo')
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      {session? redirect( '/game') : <AuthFormContainer />}

      
    </main>
  );
}
