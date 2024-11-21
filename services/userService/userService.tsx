import axios, { AxiosError } from "axios";

// Define the expected error response structure
interface APIErrorResponse {
  message: string;
}

// Create the Axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Allow credentials (cookies) in cross-origin requests
});

// Axios request interceptor (if needed for additional configuration)
api.interceptors.request.use((config) => {
  return config;
});

// Helper to check if an error is an AxiosError
const isAxiosError = (
  error: unknown,
): error is AxiosError<APIErrorResponse> => {
  return (error as AxiosError).isAxiosError !== undefined;
};

// Login with demo credentials
export const loginWithDemo = async () => {
  try {
    await api.post("/user/demo-login");

    // Wait to ensure cookie propagation
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check for the token cookie
    if (document.cookie.includes("token")) {
      return { success: true };
    }

    // Additional production check for stricter validation
    if (
      process.env.NODE_ENV === "production" &&
      !document.cookie.includes("token")
    ) {
      throw new Error("Token not set in production environment");
    }

    return { success: true };
  } catch (error: unknown) {
    // Handle Axios-specific errors with proper typing
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }

    // Handle other unknown errors
    throw new Error("Failed to login with demo account");
  }
};
