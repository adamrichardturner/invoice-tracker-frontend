"use client";

import LoginForm from "@/components/Auth/Login";
import useUser from "@/hooks/user/useUser";

export default function Page() {
  const { loginWithPassword, loginWithDemoAccount } = useUser();
  return (
    <div className="flex items-center px-2 justify-center min-h-screen bg-background">
      <LoginForm
        onLogin={loginWithPassword}
        loginWithDemoAccount={loginWithDemoAccount}
      />
    </div>
  );
}
