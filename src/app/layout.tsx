import React from "react";
import QueryProvider from "@/components/custom/query-provider";
import {Toaster} from "@/components/ui/sonner";
import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {cn} from "@/lib/utils";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Jira Clone",
    description: "Helping you build your next project faster",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
        <body className={cn(inter.className, "antialiased min-h-screen")}>
        <QueryProvider>
            <Toaster/>
            {children}
        </QueryProvider>
        </body>
        </html>
    );
}
