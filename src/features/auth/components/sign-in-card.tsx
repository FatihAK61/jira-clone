import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {DottedSeperator} from "@/components/custom/dotted-seperator";

const SignInCard = () => {
    return (
        <Card className="w-full h-full md:w-[487px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl font-bold">
                    Welcome to the Sign In Page
                </CardTitle>
            </CardHeader>
            <div>
                <DottedSeperator/>
            </div>
            <CardContent className="p-7">
                <form className="space-y-4" action="#" method="POST">

                </form>
            </CardContent>
        </Card>
    );
}

export default SignInCard;
