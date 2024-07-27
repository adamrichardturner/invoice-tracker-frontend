import Sidebar from "@/components/Sidebar/Sidebar";
import InvoiceNav from "@/components/InvoiceNav/InvoiceNav";
// import { getInvoices } from "@/services/invoiceService";

export default async function ProtectedPage() {
    // const invoices = await getInvoices();
    return (
        <div className="flex min-h-screen md:ml-[103px] items-start pt-[120px] md:pt-[78px] justify-center">
            <Sidebar />
            <main className="flex w-full md:w-[740px] items-center justify-center mx-4">
                <InvoiceNav />
            </main>
        </div>
    );
}
