import Sidebar from "@/components/Sidebar/Sidebar";
import InvoiceNav from "@/components/InvoiceNav/InvoiceNav";
import { getInvoices } from "@/services/invoiceService";
import InvoiceDisplay from "@/components/InvoiceDisplay/InvoiceDisplay";
import { Invoice } from "@/types/Invoice";

export default async function ProtectedPage() {
    const invoices: Invoice[] = await getInvoices();
    return (
        <div className="flex min-h-screen md:ml-[103px] items-start pt-[120px] md:pt-[78px] justify-center">
            <Sidebar />
            <main className="flex flex-col w-full md:w-[740px] items-center justify-center mx-4">
                <InvoiceNav />
                <InvoiceDisplay invoices={invoices} />
            </main>
        </div>
    );
}
