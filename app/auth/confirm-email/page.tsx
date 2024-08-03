"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function ConfirmEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("Confirming...");

  const confirmEmail = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email`,
        { params: { token } },
      );
      setMessage("Email confirmed successfully!");
      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/auth/login");
      }, 3000);
    } catch (error) {
      setMessage("Failed to confirm email. Please try again.");
    }
  };

  // Automatically confirm email when component mounts
  React.useEffect(() => {
    if (token) {
      confirmEmail();
    } else {
      setMessage("Invalid token.");
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">{message}</h1>
    </div>
  );
}
