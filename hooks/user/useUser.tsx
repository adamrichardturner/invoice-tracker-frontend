"use client";

import { useCallback, useEffect } from "react";
import { useUserStore } from "@/stores/UserState/useUserStore";
import { login } from "@/services/userService/userService";
import { AxiosError } from "axios";
import { User } from "@/stores/UserState/slices/userSlice";
import { useRouter } from "next/navigation";

const USER_KEY = "user";
const COOKIE_KEY = "connect.sid";

const saveSession = (user: User, cookie: string) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(COOKIE_KEY, cookie);
};

const loadSession = () => {
  const user = localStorage.getItem(USER_KEY);
  const cookie = localStorage.getItem(COOKIE_KEY);
  if (!user || user === "undefined" || !cookie) return null;
  try {
    return { user: JSON.parse(user), cookie };
  } catch (error) {
    return null;
  }
};

const clearSession = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(COOKIE_KEY);
};

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

const useUser = () => {
  const router = useRouter();
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));

  useEffect(() => {
    const storedSession = loadSession();
    if (!storedSession) {
      setUser(null);
      router.push("/auth/login");
    } else {
      setUser(storedSession.user);
    }
  }, [setUser, router]);

  const loginWithPassword = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await login(email, password);
        const user = response.user;
        const cookie = response.sessionID;
        setUser(user);
        saveSession(user, cookie);
        router.push("/");
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          throw new Error(error.message);
        } else if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unknown error occurred during login");
      }
    },
    [setUser, router],
  );

  const logout = useCallback(() => {
    setUser(null);
    clearSession();
    router.push("/auth/login");
  }, [setUser, router]);

  return {
    user,
    setUser,
    loginWithPassword,
    logout,
  };
};

export default useUser;
