import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";

const WorkspaceIdPage = async () => {
    const user = await getCurrent();
    if (!user) redirect("/sign-in")
    return (
        <div className="flex h-full w-full flex-col">
            <div className="flex h-full w-full flex-col">
                <div className="flex h-full w-full flex-col">
                    <h1 className="text-2xl font-bold">Workspace Page</h1>
                    <p>This is the workspace page for the current workspace.</p>
                </div>
            </div>
        </div>
    );
}

export default WorkspaceIdPage;
