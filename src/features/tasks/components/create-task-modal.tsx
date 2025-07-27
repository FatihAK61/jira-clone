"use client";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";
import {ResponsiveModal} from "@/components/custom/responsive-modal";


const CreateTaskModal = () => {
    const {isOpen, setIsOpen} = useCreateTaskModal();

    return (
        <ResponsiveModal open={isOpen} onOpenChange={setIsOpen}>
            <div>
                Todo: task form
            </div>
        </ResponsiveModal>
    );
}

export default CreateTaskModal;
