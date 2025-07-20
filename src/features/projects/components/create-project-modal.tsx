"use client";
import {ResponsiveModal} from "@/components/custom/responsive-modal";
import {useCreateProjectModal} from "@/features/projects/hooks/use-create-projects-modal";
import {CreateProjectForm} from "@/features/projects/components/create-project-form";


export const CreateProjectModal = () => {

    const {isOpen, setIsOpen, close} = useCreateProjectModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <CreateProjectForm onCancel={close}/>
        </ResponsiveModal>
    );
}
