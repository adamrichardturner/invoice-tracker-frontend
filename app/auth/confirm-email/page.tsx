"use client"

import React, { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios, { AxiosError } from "axios"

export default function ConfirmEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  )
  const [message, setMessage] = useState("Confirming your email...")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Invalid token. Please check your confirmation link.")
      return
    }

    const confirmEmail = async () => {
      try {
        await axios.get("/api/auth/confirm-email", { params: { token } })
        setStatus("success")
        setMessage("Email confirmed successfully!")
        setTimeout(() => router.push("/auth/login"), 1000)
      } catch (error) {
        setStatus("error")
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError
          if (axiosError.response) {
            switch (axiosError.response.status) {
              case 400:
                setMessage(
                  "Invalid or expired token. Please request a new confirmation email."
                )
                break
              case 404:
                setMessage("User not found. Please sign up again.")
                break
              default:
                setMessage(
                  "An unexpected error occurred. Please try again later."
                )
            }
          } else if (axiosError.request) {
            setMessage(
              "Network error. Please check your internet connection and try again."
            )
          } else {
            setMessage("An unexpected error occurred. Please try again later.")
          }
        } else {
          setMessage("An unexpected error occurred. Please try again later.")
        }
      }
    }

    confirmEmail()
  }, [token, router])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div
        className={`p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 ${
          status === "loading" ? "animate-pulse" : ""
        }`}
        role='alert'
        aria-live='assertive'
      >
        <div className='text-xl font-medium text-black'>{message}</div>
        {status === "loading" && (
          <div className='loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12'></div>
        )}
      </div>
    </div>
  )
}
