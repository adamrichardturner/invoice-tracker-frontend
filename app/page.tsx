"use client";

import InvoiceDisplay from "@/components/InvoiceDisplay/InvoiceDisplay";
import useInvoices from "@/hooks/invoices/useInvoices";
import useFilteredInvoices from "../hooks/invoices/useFilteredInvoices";
import { useEffect } from "react";

export default function InvoicesPage() {
  const { loading, invoicesLoaded, fetchInvoices } = useInvoices();
  const { filteredInvoices } = useFilteredInvoices();

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <div className="flex min-h-screen w-full items-start justify-center pt-[120px] md:pl-[103px] md:pt-[77px]">
      <main className="flex flex-col h-full w-full md:w-[768px] items-center justify-center mx-4">
        <InvoiceDisplay
          filteredInvoices={filteredInvoices}
          invoicesLoaded={invoicesLoaded}
          loading={loading}
        />
      </main>
    </div>
  );
}
