import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.members[":memberId"]["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.members[":memberId"]["$patch"]>;

export const useUpdateMember = () => {
    const queryClient = useQueryClient();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({param, json}) => {
            const response = await client.api.members[":memberId"]["$patch"]({param, json});
            if (!response.ok)
                throw new Error("Failed to update member. Please try again later.");
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Member updated.");
            queryClient.invalidateQueries({queryKey: ["members"]});
        },
        onError: () => {
            toast.error("Failed to update member");
        },
    });
}
