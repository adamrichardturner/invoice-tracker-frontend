"use client";

import { useCallback, useEffect } from "react";
import { useUserStore } from "@/stores/UserState/useUserStore";
import { login, registerUser } from "@/services/userService/userService";
import { AxiosError } from "axios";
import { User } from "@/stores/UserState/slices/userSlice";
import { useRouter } from "next/navigation";

const USER_KEY = "user";
const COOKIE_KEY = "connect.sid";

const saveSession = (user: User, cookie: string) => {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  sessionStorage.setItem(COOKIE_KEY, cookie);
};

const clearSession = () => {
  sessionStorage.removeItem(USER_KEY);
  sessionStorage.removeItem(COOKIE_KEY);
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

  const loginWithPassword = useCallback(
    async (email: string, password: string) => {
      try {
        clearSession();
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

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      try {
        clearSession();
        const response = await registerUser(username, email, password);
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
        throw new Error("An unknown error occurred during registration");
      }
    },
    [setUser, router],
  );

  const loginWithDemoAccount = useCallback(async () => {
    try {
      clearSession();
      const email = "demo@demo.com";
      const password = "demo123";
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
  }, [setUser, router]);

  const logout = useCallback(() => {
    setUser(null);
    clearSession();
    router.push("/auth/login");
  }, [setUser, router]);

  return {
    user,
    setUser,
    loginWithPassword,
    register,
    logout,
    loginWithDemoAccount,
  };
};

export default useUser;
