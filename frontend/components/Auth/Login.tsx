import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

export default function LoginForm() {
    return (
        <div className="max-w-full md:max-w-[400px] space-y-6">
            <div className="space-y-8 text-center">
                <div className="flex justify-center items-center space-x-3">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="38"
                        viewBox="0 0 40 38"
                        fill="none"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M10.6942 0.291992L20 18.9998L29.3058 0.291992C35.6645 3.64055 40 10.3139 40 17.9998C40 29.0454 31.0457 37.9998 20 37.9998C8.9543 37.9998 0 29.0454 0 17.9998C0 10.3139 4.33546 3.64055 10.6942 0.291992Z"
                            fill="#7C5DFA"
                        />
                    </svg>
                    <h1 className="text-3xl font-bold text-heading">Login</h1>
                </div>

                <p className="text-body leading-tight">
                    Enter your email and password below or sign in with GitHub.
                </p>
            </div>
            <div>
                <div className="space-y-4">
                    <div className="space-y-2 text-heading">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className="bg-foreground"
                            id="email"
                            type="email"
                            required
                        />
                    </div>
                    <div className="space-y-2 text-heading">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            className="bg-foreground"
                            id="password"
                            type="password"
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full text-white rounded-roundedBtn"
                    >
                        Sign In
                    </Button>
                </div>
                <Separator className="my-6 border-primary-foreground" />
                <div className="space-y-4 text-body">
                    <Button
                        variant="outline"
                        className="w-full bg-foreground rounded-roundedBtn"
                    >
                        <FaGithub className="h-5 w-5 mr-2 text-heading" />
                        Sign in with GitHub
                    </Button>
                    <Link
                        href="#"
                        className="inline-block w-full text-center text-sm underline"
                        prefetch={false}
                    >
                        Forgot your password?
                    </Link>
                </div>
                <Separator className="my-8" />
                <div className="text-center">
                    <p className="text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            href="/auth/register"
                            className="underline"
                            prefetch={false}
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
