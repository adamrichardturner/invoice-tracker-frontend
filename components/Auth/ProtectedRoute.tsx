"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";
import LoaderAnimation from "@/components/Loader/index";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsAuthenticated(false);
        router.push("/auth/demo");
        return;
      }

      try {
        const decodedToken = jwtDecode<{ exp: number }>(token);
        if (!decodedToken.exp || decodedToken.exp * 1000 < Date.now()) {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          router.push("/auth/demo");
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        router.push("/auth/demo");
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <LoaderAnimation
          size={70}
          theme={theme === "dark" ? "dark" : "light"}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Sidebar />
      {children}
      <Toaster position="top-right" />
    </>
  );
}
