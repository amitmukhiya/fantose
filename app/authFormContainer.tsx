"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoginForm from "@/app/login/page"
import RegisterForm from "@/app/register/page"
import { useSession, signIn, signOut } from "next-auth/react"

export default function AuthFormContainer() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={isLogin ? "login" : "register"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </motion.div>
      </AnimatePresence>
      <button onClick={() => setIsLogin(!isLogin)} className="mt-4 w-full text-white hover:underline">
        {isLogin ? "Need an account? Register" : "Already have an account? Login"}
      </button>
    </div>
  )
}

