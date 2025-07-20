"use client";

import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";

import {RiAddCircleFill} from "react-icons/ri";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-projects-modal";
import {ProjectAvatar} from "@/features/projects/components/project-avatar";

const Projects = () => {
    const projectId = "1";
    const pathname = usePathname();
    const {open} = useCreateProjectModal();
    const workspaceId = useWorkspaceId();
    const {data} = useGetProjects({workspaceId});

    return (
        <div className="flex flex-col gap-y-2 mb-1">
            <div className="flex items-center justify-between mt-1">
                <p className="text-xs uppercase text-neutral-500">Projects</p>
                <RiAddCircleFill onClick={open}
                                 className="size-5 text-neutral-500 cursor-pointer transition hover:opacity-75"/>
            </div>
            {
                data?.documents.map((project) => {
                    const href = `/workspaces/${workspaceId}/projects/${projectId}`;
                    const isActive = pathname === href;

                    return (
                        <Link href={href} key={project.$id}>
                            <div
                                className={cn("flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                                    isActive && "bg-white shadow-sm hover:opacity-100 text-primary")}>
                                <ProjectAvatar name={project.name} image={project.imageUrl}/>
                                <span className="truncate">{project.name}</span>
                            </div>
                        </Link>
                    );
                })
            }
        </div>
    );
};

export default Projects;
