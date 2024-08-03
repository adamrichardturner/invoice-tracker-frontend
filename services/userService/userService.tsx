import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const isAxiosError = (error: unknown): error is AxiosError => {
  return (error as AxiosError).isAxiosError !== undefined;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    } else if (error instanceof Error) {
      throw new Error(
        error.message || "An unknown error occurred during login",
      );
    }
    throw new Error("An unknown error occurred during login");
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    } else if (error instanceof Error) {
      throw new Error(
        error.message || "An unknown error occurred during logout",
      );
    }
    throw new Error("An unknown error occurred during logout");
  }
};

export const getSession = async () => {
  try {
    const response = await api.get("/auth/session");
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    } else if (error instanceof Error) {
      throw new Error(
        error.message || "An unknown error occurred while getting session",
      );
    }
    throw new Error("An unknown error occurred while getting session");
  }
};

export const registerUser = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    } else if (error instanceof Error) {
      throw new Error(
        error.message || "An unknown error occurred during registration",
      );
    }
    throw new Error("An unknown error occurred during registration");
  }
};

export const confirmEmail = async (token: string) => {
  try {
    const response = await api.get("/auth/confirm-email", {
      params: { token },
    });
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      throw new Error(error.message);
    } else if (error instanceof Error) {
      throw new Error(
        error.message || "An unknown error occurred during email confirmation",
      );
    }
    throw new Error("An unknown error occurred during email confirmation");
  }
};
