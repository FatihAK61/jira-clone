import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {client} from "@/lib/rpc";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>;

export const useRegister = () => {

    const queryClient = useQueryClient();
    const router = useRouter();

    return useMutation<ResponseType, Error, RequestType>({
        mutationFn: async ({json}) => {
            const response = await client.api.auth.register["$post"]({json});
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Registration successful. Please check your email to verify your account.");
            router.refresh();
            queryClient.invalidateQueries({queryKey: ["current"]});
        },
        onError: () => {
            toast.error("Failed to register. Please check your details and try again.");
        }
    });
}
