import Sidebar from "@/components/Sidebar/Sidebar";
import { getInvoices } from "@/services/invoiceService";

export default async function ProtectedPage() {
    const invoices = await getInvoices();
    console.log("invoices", invoices);
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex w-full min-h-screen flex-col items-center justify-between p-24">
                <pre className="text-body">
                    {JSON.stringify(invoices, null, 2)}
                </pre>
            </main>
        </div>
    );
}
