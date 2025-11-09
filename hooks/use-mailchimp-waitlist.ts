"use client"

import { useState } from "react"

type Status = "idle" | "loading" | "success" | "error"

const MAILCHIMP_ENDPOINT =
  "https://gmail.us6.list-manage.com/subscribe/post?u=1cef3766ef227139e3c699e85&id=536a3e4923&f_id=008583e5f0"

export function useMailchimpWaitlist() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [message, setMessage] = useState<string | null>(null)

  const reset = () => {
    setStatus("idle")
    setMessage(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const emailValue = (formData.get("EMAIL") as string)?.trim() ?? ""

    if (!emailValue || !emailValue.includes("@")) {
      setStatus("error")
      setMessage("Please enter a valid email address.")
      return
    }

    setStatus("loading")
    setMessage(null)

    try {
      await fetch(MAILCHIMP_ENDPOINT, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })

      setStatus("success")
      setMessage("You're on the list! Check your inbox to confirm.")
      setEmail("")
      form.reset()
    } catch (error) {
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
    }
  }

  return {
    email,
    setEmail,
    status,
    message,
    setMessage,
    setStatus,
    handleSubmit,
    reset,
  }
}

