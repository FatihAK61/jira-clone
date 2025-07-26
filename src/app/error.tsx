"use client";

import {AlertTriangle} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
    return (
        <div className="h-screen flex flex-col gap-y-4 items-center justify-center">
            <AlertTriangle className="size-10 text-muted-foreground"/>
            <h1 className="text-4xl font-bold text-red-600">Error</h1>
            <p className="mt-4 text-lg text-gray-700">An unexpected error has occurred.</p>
            <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
            <Button variant="secondary">
                <Link href="/">
                    Back to Home
                </Link>
            </Button>
        </div>
    );
}

export default ErrorPage;
