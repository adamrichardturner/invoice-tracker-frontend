"use client";

import LoginForm from "@/components/Auth/Login";
import useUser from "@/hooks/user/useUser";

export default function Page() {
  const { loginWithPassword } = useUser();
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <LoginForm onLogin={loginWithPassword} />
    </div>
  );
}
