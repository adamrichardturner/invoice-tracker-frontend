import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

interface LoginFormProps {
    onLogin: (email: string, password: string) => void;
}

const schema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginForm({ onLogin }: LoginFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: LoginFormData) => {
        onLogin(data.email, data.password);
    };

    return (
        <div className="max-w-full md:w-[480px] space-y-10 py-10 bg-foreground p-8 rounded-lg shadow-lg">
            <div className="space-y-8 text-center">
                <div className="flex flex-col justify-center items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="38"
                        viewBox="0 0 40 38"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.6942 0.291992L20 18.9998L29.3058 0.291992C35.6645 3.64055 40 10.3139 40 17.9998C40 29.0454 31.0457 37.9998 20 37.9998C8.9543 37.9998 0 29.0454 0 17.9998C0 10.3139 4.33546 3.64055 10.6942 0.291992Z"
                            fill="#7C5DFA"
                        />
                    </svg>
                    <h1 className="text-3xl font-bold text-heading">
                        Invoicez
                    </h1>
                </div>

                <p className="text-body text-sm leading-tight">
                    Enter your email and password below or sign in with GitHub.
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="space-y-2 text-heading">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            className="bg-foreground"
                            id="email"
                            type="email"
                            {...register("email")}
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2 text-heading">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            className="bg-foreground"
                            id="password"
                            type="password"
                            {...register("password")}
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full text-white rounded-roundedBtn"
                    >
                        Sign In
                    </Button>
                </div>
            </form>
            <Separator className="my-6 border-primary-foreground" />
            <div className="space-y-4 text-heading dark:text-secondaryBody">
                <Button
                    variant="outline"
                    className="w-full bg-foreground dark:hover:text-black rounded-roundedBtn"
                >
                    <FaGithub className="h-5 w-5 mr-2" />
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
                <p className="text-heading dark:text-secondaryBody text-sm">
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
    );
}
