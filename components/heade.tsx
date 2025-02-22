"use client"

import { Bell } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Img1 from '@/components/cricketfantoss.png'
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function Header() {
  const { data: session } = useSession()
 
  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Image src={Img1} alt="Logo" width={200} height={100} className="h-12 w-auto" />
        </div>

        <div className="flex items-center text-white space-x-4">
          <button className="p-2 hover:bg-gray-800 rounded-full relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-600 rounded-full" />
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>US</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
             
              <DropdownMenuItem onClick={() => {
                signOut();
                console.log(session)
                if(!session){
                  redirect('/')
                }
              }} >Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

