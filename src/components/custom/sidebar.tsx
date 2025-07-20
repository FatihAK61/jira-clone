import Link from "next/link";
import Image from "next/image";
import WorkspaceSwitcher from "@/components/custom/workspace-switcher";
import {DottedSeperator} from "@/components/custom/dotted-seperator";
import Navigation from "@/components/custom/navigation";
import Projects from "@/components/custom/projects";

const Sidebar = () => {
    return (
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
                <Image priority src="/logo.svg" alt="Logo" width={153} height={38} className="mb-6"/>
            </Link>
            <DottedSeperator/>
            <WorkspaceSwitcher/>
            <DottedSeperator/>
            <Navigation/>
            <DottedSeperator/>
            <Projects/>
        </aside>
    );
}

export default Sidebar;
