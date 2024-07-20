import { AccountAvatar } from "../Auth/AccountAvatar/AccountAvatar";
import { ModeToggle } from "../Theme/ModeToggle";
import SheetToggle from "./SheetToggle/SheetToggle";

export default function Sidebar() {
    return (
        <div className="flex items-center justify-between fixed top-0 md:flex-col w-full h-[80px] min-h-[80px] md:h-full md:w-[103px] md:static md:min-h-screen bg-sidebarBg md:rounded-tr-3xl md:rounded-br-3xl shadow-md">
            <SheetToggle />
            <div className="flex items-center justify-end md:flex-col h-full w-full">
                <div className="md:pb-8 w-[86px] flex items-center justify-center">
                    <ModeToggle />
                </div>

                <div className="md:w-full border-l w-[86px] h-[80px] md:h-[102px] flex items-center justify-center md:justify-center md-h-auto md:border-t md:border-l-0 border-[#494E6E]">
                    <AccountAvatar />
                </div>
            </div>
        </div>
    );
}
