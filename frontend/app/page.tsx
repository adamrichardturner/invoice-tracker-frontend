import { ModeToggle } from "@/components/Theme/ModeToggle";

export default function ProtectedPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <ModeToggle />
            <h1>Protected Content</h1>
            <p>
                This is a protected page. Only logged-in users can see this
                content.
            </p>
        </main>
    );
}
