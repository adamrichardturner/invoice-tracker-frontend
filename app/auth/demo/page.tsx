"use client";

import { Button } from "@/components/ui/button";
import { loginWithDemo } from "@/services/userService/userService";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

export default function DemoPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoLogin = async () => {
    try {
      setIsLoading(true);
      const response = await loginWithDemo();
      if (response.success) {
        const delay = process.env.NODE_ENV === "production" ? 1000 : 100;
        setTimeout(() => {
          window.location.href = "/";
        }, delay);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Demo login failed";
      console.error("Demo login failed:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <Card className="w-full md:w-[350px] flex flex-col p-6">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Invoice Tracker Demo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center">
          <Button
            onClick={handleDemoLogin}
            size="lg"
            disabled={isLoading}
            className="dark:bg-btn-primary bg-primary text-md text-white"
          >
            {isLoading ? "Logging in..." : "Try Demo"}
          </Button>
          <CardFooter className="flex flex-col items-center justify-center">
            <Link href="https://adamrichardturner.dev">
              <p className="text-sm text-charcoal">
                Made by{" "}
                <span className="font-bold underline">Adam Richard Turner</span>
              </p>
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
}
