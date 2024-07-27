"use client";

import { Invoice } from "@/types/Invoice";
import { useUIStore } from "@/stores/UIState/useUIStore";
import { InvoiceCard } from "../InvoiceCard/InvoiceCard";

interface InvoiceDisplayProps {
    invoices: Invoice[];
}

const InvoiceDisplay = ({ invoices }: InvoiceDisplayProps) => {
    const selectedFilters = useUIStore((state) => state.selectedFilters);
    const filteredInvoices =
        selectedFilters.length > 0
            ? invoices.filter((invoice) =>
                  selectedFilters.includes(invoice.status),
              )
            : invoices;

    return (
        <div className="w-full space-y-6 pt-[55px]">
            {filteredInvoices.map((invoice) => (
                <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
        </div>
    );
};

export default InvoiceDisplay;
