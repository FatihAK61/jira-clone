import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = ({children}: AuthLayoutProps) => {
    return (
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex items-center justify-between">
                    <Image src="/logo.svg" alt="logo" height={48} width={180}/>
                </nav>
                {children}
            </div>
        </main>
    );
}

export default AuthLayout;
