import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Select} from "@/components/ui/select";

export default function Home() {
    return (
        <div className="flex gap-4 mt-3 ml-3">
            <div className="row-auto flex flex-col gap-4">
                <Button variant="primary">Fahişe Zübeydeye Bas</Button>
                <Button variant="destructive">Kahpe Zübeyde</Button>
                <Button variant="outline">Zübeydeyi Dışla</Button>
                <Button variant="secondary">Zübeydeyi İkinci Sıraya Al</Button>
                <Button variant="ghost">Zübeydeyi Hayalet Yap</Button>
                <Button variant="muted">Orospu</Button>
                <Button variant="tesla">Sikik</Button>
                <Input/>
                <Select/>
            </div>

        </div>
    );
}
