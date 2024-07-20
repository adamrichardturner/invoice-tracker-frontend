import Sidebar from "@/components/Sidebar/Sidebar";
import { ModeToggle } from "@/components/Theme/ModeToggle";

export default function ProtectedPage() {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex w-full min-h-screen flex-col items-center justify-between p-24">
                <ModeToggle />
                <h1>Protected Content</h1>
                <p>
                    This is a protected page. Only logged-in users can see this
                    content.
                </p>
            </main>
        </div>
    );
}
