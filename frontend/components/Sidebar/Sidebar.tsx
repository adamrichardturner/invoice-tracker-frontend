import { AccountAvatar } from "../Auth/AccountAvatar/AccountAvatar";
import { ModeToggle } from "../Theme/ModeToggle";
import SheetToggle from "./SheetToggle/SheetToggle";

export default function Sidebar() {
    return (
        <div className="flex items-center justify-between flex-col w-[103px] min-h-screen bg-sidebarBg rounded-tr-3xl rounded-br-3xl shadow-md">
            <SheetToggle />
            <div className="flex items-center justify-center flex-col">
                <div className="pb-8">
                    <ModeToggle />
                </div>

                <div className="p-8 border-t border-[#494E6E]">
                    <AccountAvatar />
                </div>
            </div>
        </div>
    );
}
