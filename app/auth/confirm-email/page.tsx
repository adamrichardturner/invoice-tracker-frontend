"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { confirmEmail } from "@/services/userService/userService";

export default function ConfirmEmailPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Suspense fallback={<div>Loading...</div>}>
        <ConfirmEmailContent />
      </Suspense>
    </div>
  );
}

function ConfirmEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Confirming your email...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Invalid token. Please check your confirmation link.");
      return;
    }

    const handleConfirmEmail = async () => {
      try {
        await confirmEmail(token);
        setStatus("success");
        setMessage("Email confirmed successfully!");
        setTimeout(() => router.push("/auth/login"), 3000);
      } catch (error) {
        setStatus("error");
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage("An unexpected error occurred. Please try again later.");
        }
      }
    };

    handleConfirmEmail();
  }, [token, router]);

  return (
    <div
      className={`p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 ${
        status === "loading" ? "animate-pulse" : ""
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div className="text-xl font-medium text-black">{message}</div>
      {status === "loading" && (
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      )}
    </div>
  );
}
