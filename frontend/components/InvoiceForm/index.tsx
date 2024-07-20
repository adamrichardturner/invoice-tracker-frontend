import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import SheetToggle from "../Sidebar/SheetToggle/SheetToggle";

export function InvoiceForm() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <SheetToggle />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="top-[80px] sm:top-[80px] md:top-0 md:left-[103px] w-full max-w-[100vw] sm:max-w-[580px] sm:rounded-tr-3xl sm:rounded-br-3xl"
            >
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4 w-full">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
