"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { loginWithDemo } from "@/services/userService/userService";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function DemoPage() {
  const router = useRouter();

  const handleDemoLogin = async () => {
    try {
      await loginWithDemo();
      router.push("/");
    } catch (error) {
      console.error("Demo login failed:", error);
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
            className="dark:bg-btn-primary bg-primary text-md text-white"
          >
            Try Demo
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
