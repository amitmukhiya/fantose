"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

type FormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log(data)
    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Register</h2>
      <div className="space-y-2">
        <Label htmlFor="name" className="text-black">Name</Label>
        <Input className="bg-white" id="name" {...register("name", { required: "Name is required" })} placeholder="Enter your name" />
        {errors.name && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.name.message}
          </motion.p>
        )}
      </div>
      <div className="space-y-2 ">
        <Label  htmlFor="email" className="text-black">Email</Label>
        <Input
        className="bg-white"
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          placeholder="Enter your email"
        />
        {errors.email && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.email.message}
          </motion.p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-black">Password</Label>
        <Input
        className="bg-white"
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" },
          })}
          placeholder="Enter your password"
        />
        {errors.password && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.password.message}
          </motion.p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-black">Confirm Password</Label>
        <Input
        className="bg-white"
          id="confirmPassword"
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Your passwords do not match"
              }
            },
          })}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-sm flex items-center"
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.confirmPassword.message}
          </motion.p>
        )}
      </div>
      <Button type="submit" className="w-full bg-black" disabled={isLoading}>
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  )
}

