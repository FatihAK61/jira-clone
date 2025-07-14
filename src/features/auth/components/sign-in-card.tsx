import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeperator} from "@/components/custom/dotted-seperator";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

const SignInCard = () => {
    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl font-bold">
                    Welcome Back!
                </CardTitle>
            </CardHeader>
            <div>
                <DottedSeperator/>
            </div>
            <CardContent className="p-7">
                <form className="space-y-4" action="#" method="POST">
                    <Input required type="email" placeholder="Enter Email Address"
                           value={""} onChange={() => {
                    }} disabled={false}/>
                    <Input required type="password" placeholder="Enter Password"
                           value={""} onChange={() => {
                    }} disabled={false} min={8} max={24}/>
                    <Button disabled={false} size="lg" className="w-full">Login</Button>
                </form>
            </CardContent>
            <div className="px-7">
                <DottedSeperator/>
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button variant="secondary" size="lg" disabled={false} className="w-full">
                    Login with Google
                </Button>
                <Button variant="secondary" size="lg" disabled={false} className="w-full">
                    Login with Github
                </Button>
            </CardContent>
        </Card>
    );
}

export default SignInCard;
