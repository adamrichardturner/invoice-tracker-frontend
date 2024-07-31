"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import Sidebar from "./Sidebar/Sidebar";
import { usePathname } from "next/navigation";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    const path = usePathname();
    const isAuthPage = path === "/auth/login" || path === "/auth/register";
    console.log("PATH ", path);
    return (
        <NextThemesProvider {...props}>
            {!isAuthPage && <Sidebar />}
            {children}
        </NextThemesProvider>
    );
}
