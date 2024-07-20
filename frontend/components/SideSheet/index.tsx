import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import SheetToggle from "../Sidebar/SheetToggle/SheetToggle";
import { InvoiceForm } from "../InvoiceForm/index";

export function SideSheet() {
    const isEditing = false;
    return (
        <Sheet>
            <SheetTrigger asChild>
                <SheetToggle />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="top-[80px] overflow-y-auto no-scrollbar sm:top-[80px] md:top-0 md:left-[103px] w-full max-w-[100vw] sm:max-w-[580px] sm:rounded-tr-3xl sm:rounded-br-3xl"
            >
                <SheetHeader>
                    <SheetTitle className="pb-8">
                        {isEditing ? "Edit Invoice" : "New Invoice"}
                    </SheetTitle>
                </SheetHeader>
                <InvoiceForm />
            </SheetContent>
        </Sheet>
    );
}
