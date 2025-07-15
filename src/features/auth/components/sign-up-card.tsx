import {z} from "zod";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeperator} from "@/components/custom/dotted-seperator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {registerSchema} from "@/features/auth/schemas";
import {useRegister} from "@/features/auth/api/use-register";

const SignUpCard = () => {

    const {mutate} = useRegister();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });

    const onSubmit = (values: z.infer<typeof registerSchema>) => {
        mutate({json: values});
    };

    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl font-bold">
                    Sign Up
                </CardTitle>
                <CardDescription>
                    Create an account to get started with our services.
                    <br/>
                    <br/>
                    By signing up, you agree to our <a href="/terms" className="text-blue-500 hover:underline">Terms of
                    Service</a> and <a href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</a>.
                </CardDescription>
            </CardHeader>
            <div>
                <DottedSeperator/>
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            name="name"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="text" placeholder="Enter Name"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name="email"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="email" placeholder="Enter Email Address"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <FormField
                            name="password"
                            control={form.control}
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input {...field} type="password" placeholder="Enter Password"/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                        <Button disabled={false} size="lg" className="w-full">Sign Up</Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7">
                <DottedSeperator/>
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button variant="secondary" size="lg" disabled={false} className="w-full">
                    <FcGoogle className="mr-2 size-5"/>
                    SignUp with Google
                </Button>
                <Button variant="secondary" size="lg" disabled={false} className="w-full">
                    <FaGithub className="mr-2 size-5"/>
                    SignUp with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeperator/>
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p className="text-center text-sm text-muted-foreground">
                    Already have an account? <a href="/sign-in" className="text-blue-500 hover:underline">Sign
                    In</a>
                </p>
            </CardContent>
        </Card>
    );
}

export default SignUpCard;
