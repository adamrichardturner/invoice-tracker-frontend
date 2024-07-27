import Sidebar from "@/components/Sidebar/Sidebar";
import InvoiceNav from "@/components/InvoiceNav/InvoiceNav";
import { getInvoices } from "@/services/invoiceService";

export default async function ProtectedPage() {
    const invoices = await getInvoices();
    console.log("invoices", invoices);
    return (
        <div className="flex min-h-screen ml-[103px] items-start pt-[78px] justify-center">
            <Sidebar />
            <main className="flex w-full md:w-[740px] items-center justify-center">
                <InvoiceNav />
            </main>
        </div>
    );
}
