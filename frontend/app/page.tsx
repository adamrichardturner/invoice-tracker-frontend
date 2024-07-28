"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import InvoiceDisplay from "@/components/InvoiceDisplay/InvoiceDisplay";
import useInvoices from "@/hooks/invoices/useInvoices";
import useFilteredInvoices from "../hooks/invoices/useFilteredInvoices";

export default function InvoicesPage() {
    const { loading, invoicesLoaded } = useInvoices();
    const { filteredInvoices } = useFilteredInvoices();

    return (
        <div className="flex min-h-screen md:ml-[103px] items-start pt-[120px] md:pt-[78px] justify-center">
            <Sidebar />
            <main className="flex flex-col h-full w-full md:w-[700px] items-center justify-center mx-4">
                <InvoiceDisplay
                    filteredInvoices={filteredInvoices}
                    invoicesLoaded={invoicesLoaded}
                    loading={loading}
                />
            </main>
        </div>
    );
}
