"use client";

import { Invoice } from "@/types/Invoice";
import { InvoiceCard } from "../InvoiceCard/InvoiceCard";
import Placeholder from "@/assets/ui/empty-illustration.svg";
import InfinitySpinner from "@/assets/ui/infinitySpinner.svg";
import Image from "next/image";

interface InvoiceListProps {
    filteredInvoices: Invoice[];
    loading: boolean;
    invoicesLoaded: boolean;
}

const InvoiceList = ({
    filteredInvoices,
    loading,
    invoicesLoaded,
}: InvoiceListProps) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center pt-[55px] space-y-6">
            {loading ? (
                <div className="flex justify-center items-center h-full w-full">
                    <Image
                        src={InfinitySpinner}
                        alt="Loading..."
                        width={200}
                        height={200}
                    />
                </div>
            ) : invoicesLoaded && filteredInvoices.length === 0 ? (
                <div className="flex flex-col justify-center items-center h-full w-full">
                    <Image src={Placeholder} alt="No invoices found" />
                    <h3 className="text-heading mt-4">There is nothing here</h3>
                    <p className="text-center">
                        Create an invoice by clicking the <br /> New Invoice
                        button and get started
                    </p>
                </div>
            ) : (
                filteredInvoices.map((invoice: Invoice) => (
                    <InvoiceCard key={invoice.id} invoice={invoice} />
                ))
            )}
        </div>
    );
};

export default InvoiceList;
