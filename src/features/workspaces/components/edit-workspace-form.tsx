"use client";
import {z} from "zod";
import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/use-confirm";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {useUpdateWorkspace} from "@/features/workspaces/api/use-update-workspace";
import {useDeleteWorkspace} from "@/features/workspaces/api/use-delete-workspace";
import {useResetInviteCode} from "@/features/workspaces/api/use-reset-invite-code";

import {cn} from "@/lib/utils";
import Image from "next/image";
import {Avatar, AvatarFallback} from "@/components/ui/avatar";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {updateWorkspaceSchema} from "@/features/workspaces/schemas";
import {DottedSeperator} from "@/components/custom/dotted-seperator";
import {ArrowLeftIcon, CopyIcon, ImageIcon} from "lucide-react";
import {Workspace} from "@/features/workspaces/types";

interface EditWorkspaceFormProps {
    onCancel?: () => void;
    initialValues: Workspace;
}

export const EditWorkspaceForm = ({onCancel, initialValues}: EditWorkspaceFormProps) => {
    const router = useRouter();
    const {mutate, isPending} = useUpdateWorkspace();
    const {mutate: resetInviteCode, isPending: isResettingInviteCode} = useResetInviteCode();
    const {mutate: deleteWorkspace, isPending: isDeletingWorkspace} = useDeleteWorkspace();
    const [fullInviteLink, setFullInviteLink] = useState('');
    const [DeleteDialog, confirmDelete] = useConfirm(
        "Delete Workspace",
        "Are you sure you want to delete this workspace? This action cannot be undone.",
        "destructive"
    );
    const [ResetDialog, confirmReset] = useConfirm(
        "Reset Invite Link",
        "Are you sure you want to reset the invite link? This will invalidate the current invite link and generate a new one.",
        "destructive"
    );
    const inputRef = useRef<HTMLInputElement>(null);
    const form = useForm<z.infer<typeof updateWorkspaceSchema>>({
        resolver: zodResolver(updateWorkspaceSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? undefined
        }
    });
    const onSubmit = (values: z.infer<typeof updateWorkspaceSchema>) => {
        const finalValues = {
            ...values,
            image: values.image instanceof File ? values.image : ""
        }
        mutate({form: finalValues, param: {workspaceId: initialValues.$id}}, {
            onSuccess: ({data}) => {
                form.reset();
                router.push(`/workspaces/${data.$id}`);
            }
        });
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file)
            form.setValue("image", file);
    }
    const handleResetInviteCode = async () => {
        const ok = await confirmReset();

        if (!ok) return;

        resetInviteCode({param: {workspaceId: initialValues.$id}}, {
            onSuccess: () => {
                router.refresh();
                toast.success("Invite link reset successfully.");
            },
            onError: () => {
                toast.error("Failed to reset invite link");
            }
        });
    };
    const handleDelete = async () => {
        const ok = await confirmDelete();

        if (!ok) return;

        deleteWorkspace({param: {workspaceId: initialValues.$id}}, {
            onSuccess: () => {
                window.location.href = "/"
                toast.success("Workspace deleted successfully.");
            },
            onError: () => {
                toast.error("Failed to delete workspace");
            }
        });
    };
    useEffect(() => {
        setFullInviteLink(
            `${window.location.origin}/workspaces/${initialValues.$id}/join/${initialValues.inviteCode}`
        );
    }, [initialValues.$id, initialValues.inviteCode]);
    const handleCopyInviteLink = () => {
        navigator.clipboard.writeText(fullInviteLink)
            .then(() => {
                toast.success("Invite link copied to clipboard.");
            })
            .catch(() => {
                toast.error("Failed to copy invite link.");
            });
    };

    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDialog/>
            <ResetDialog/>
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
                    <Button size="sm" variant="secondary"
                            onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.$id}`)}>
                        <ArrowLeftIcon className="size-4 mr-2"/>
                        Back
                    </Button>
                    <CardTitle className="text-xl font-bold text-center justify-center items-center">
                        {initialValues.name}
                    </CardTitle>
                </CardHeader>
                <div className="px-7">
                    <DottedSeperator/>
                </div>
                <CardContent className="p-7">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-y-4">
                                <FormField control={form.control} name="name" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>
                                            Workspace Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder="Enter workspace name"/>
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="image" render={({field}) => (
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex items-center gap-x-5">
                                            {
                                                field.value ? (
                                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                                        <Image
                                                            src={field.value instanceof File ? URL.createObjectURL(field.value) : field.value}
                                                            alt="logo"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <Avatar className="size-[72px]">
                                                        <AvatarFallback>
                                                            <ImageIcon className="size-[36px] text-neutral-500"/>
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )
                                            }
                                            <div className="flex flex-col">
                                                <p className="text-sm">Workspace Icon</p>
                                                <p className="text-sm text-muted-foreground">
                                                    Upload an image to use as your workspace icon. It will be displayed
                                                    in
                                                    the
                                                    sidebar and other places. Only PNG, JPG, and SVG formats are
                                                    supported.
                                                </p>
                                                <input
                                                    className="hidden"
                                                    type="file"
                                                    accept=".jpg, .png, .jpeg, .svg"
                                                    ref={inputRef}
                                                    onChange={handleImageChange}
                                                    disabled={isPending}
                                                />
                                                {
                                                    field.value ? (
                                                        <Button type="button"
                                                                disabled={isPending}
                                                                variant="destructive"
                                                                size="xs"
                                                                className="w-fit mt-2"
                                                                onClick={() => {
                                                                    field.onChange(null);
                                                                    if (inputRef.current)
                                                                        inputRef.current.value = "";
                                                                }}>
                                                            Remove Image
                                                        </Button>
                                                    ) : (
                                                        <Button type="button"
                                                                disabled={isPending}
                                                                variant="tesla"
                                                                size="xs"
                                                                className="w-fit mt-2"
                                                                onClick={() => inputRef.current?.click()}>
                                                            Upload Image
                                                        </Button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )}/>
                            </div>
                            <DottedSeperator className="py-7"/>
                            <div className="flex items-center justify-between">
                                <Button type="button" disabled={isPending} size="lg" variant="secondary"
                                        onClick={onCancel}
                                        className={cn(!onCancel && "invisible")}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isPending} size="lg">
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Invite Members</h3>
                        <p className="text-sm text-muted-foreground">
                            Use the invite code below to invite members to your workspace.
                        </p>
                        <div className="mt-4">
                            <div className="flex items-center gap-x-2">
                                <Input disabled value={fullInviteLink}/>
                                <Button
                                    onClick={handleCopyInviteLink}
                                    variant="secondary"
                                    className="size-10"
                                >
                                    <CopyIcon className="size-5"/>
                                </Button>
                            </div>
                        </div>
                        <DottedSeperator className="py-7"/>
                        <Button className="mt-6 w-fit ml-auto"
                                size="sm"
                                variant="destructive"
                                type="button"
                                disabled={isPending || isResettingInviteCode}
                                onClick={handleResetInviteCode}>
                            Reset Invite Link
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">Danger Zone</h3>
                        <p className="text-sm text-muted-foreground">
                            Deleting a workspace is a permanent action and cannot be undone. All data associated with
                            this workspace will be lost.
                        </p>
                        <DottedSeperator className="py-7"/>
                        <Button className="mt-6 w-fit ml-auto"
                                size="sm"
                                variant="destructive"
                                type="button"
                                disabled={isPending || isDeletingWorkspace}
                                onClick={handleDelete}>
                            Delete Workspace
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
