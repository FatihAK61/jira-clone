"use client";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useLogout} from "@/features/auth/api/use-logout";
import {useCurrent} from "@/features/auth/api/use-current";
import {Button} from "@/components/ui/button";

export default function Home() {
    const router = useRouter();
    const {data, isLoading} = useCurrent();
    const {mutate} = useLogout();

    useEffect(() => {
        if (!data && !isLoading)
            router.push("/sign-in");
    }, [data]);

    return (
        <div className="flex gap-4 mt-3 ml-3">
            Only authenticated users can see this page.
            <Button onClick={() => mutate()} variant="secondary" size="sm" disabled={isLoading} className="ml-3">
                Logout
            </Button>
        </div>
    );
}
