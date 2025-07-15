import {redirect} from "next/navigation";
import {getCurrent} from "@/features/auth/actions";

export default async function Home() {

    const user = await getCurrent();

    if (!user) redirect("/sign-in");

    return (
        <div className="flex gap-4 mt-3 ml-3">
            This is the home page.
        </div>
    );
}
