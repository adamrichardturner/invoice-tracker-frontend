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
    const response = await api.post("/user/demo-login");

    console.log("Demo login response headers:", response.headers);
    console.log("Demo login response cookies:", document.cookie);

    // Check if we received a token in the response data
    if (!response.data?.token) {
      throw new Error("No token received from server");
    }

    // Manually set the cookie if it's not being set by the server
    if (!document.cookie.includes("token=")) {
      document.cookie = `token=${response.data.token}; path=/; secure; samesite=strict; max-age=86400`;
    }

    return { success: true, token: response.data.token };
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to login with demo account");
  }
};
