"use client";
import {useRouter} from "next/navigation";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeperator} from "@/components/custom/dotted-seperator";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useInviteCode} from "@/features/workspaces/hooks/use-invite-code";
import {useJoinWorkspace} from "@/features/workspaces/api/use-join-workspace";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspace-id";

interface JoinWorkspaceFormProps {
    initialValues: {
        name: string;
    };
}

export const JoinWorkspaceForm = ({initialValues}: JoinWorkspaceFormProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const inviteCode = useInviteCode();
    const {mutate, isPending} = useJoinWorkspace();

    const onSubmit = () => {
        mutate({
            param: {workspaceId},
            json: {
                code: inviteCode
            }
        }, {
            onSuccess: ({data}) => {
                router.push(`/workspaces/${data.id}`);
            }
        });
    }

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join Workspace
                </CardTitle>
                <CardDescription>
                    You&apos;ve have been invited to join <strong>{initialValues.name}</strong> workspace. Please enter
                    the invite
                    code provided by the
                    workspace owner to join.
                </CardDescription>
                <div className="px-7">
                    <DottedSeperator/>
                </div>
                <CardContent className="p-7">
                    <div className="flex items-center gap-2 justify-center">
                        <Button className="w-full lg:w-fit" variant="secondary" type="button" size="lg" asChild
                                disabled={isPending}>
                            <Link href="/">Cancel</Link>
                        </Button>
                        <Button className="w-full lg:w-fit" size="lg" type="button" onClick={onSubmit}
                                disabled={isPending}>
                            Join
                        </Button>
                    </div>
                </CardContent>
            </CardHeader>
        </Card>
    );
};
