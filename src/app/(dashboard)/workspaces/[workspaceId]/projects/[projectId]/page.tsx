import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";

interface ProjectIdPageProps {
    params: {
        projectId: string;
    };
}

const ProjectIdPage = async ({params}: ProjectIdPageProps) => {

    const user = await getCurrent();
    if (!user) redirect("/sign-in");

    return (
        <div>
            <h1>Project ID Page</h1>
            <p>This is the project ID page for a specific project. {params.projectId}</p>
        </div>
    );
}

export default ProjectIdPage;
