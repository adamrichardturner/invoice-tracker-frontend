"use client";

import { useEffect } from "react";
import { useInvoicesStore } from "@/stores/InvoicesState/useInvoicesStore";
import { getInvoiceById } from "@/services/invoiceService";
import InvoiceSingleNav from "@/components/InvoiceSingle/InvoiceSingleNav/InvoiceSingleNav";
import BackButton from "@/components/BackButton/BackButton";
import { Invoice } from "@/types/Invoice";
import InvoiceDetail from "@/components/InvoiceDetail/InvoiceDetail";
import ProtectedRoute from "@/components/Auth/ProtectedRoute";

type Props = {
  params: {
    id: string;
  };
};

export default function InvoicePage({ params }: Props) {
  const { id } = params;
  const setSelectedInvoice = useInvoicesStore(
    (state) => state.setSelectedInvoice,
  );

  useEffect(() => {
    async function fetchInvoice() {
      const invoice: Invoice = await getInvoiceById(id);
      setSelectedInvoice(invoice);
    }

    fetchInvoice();
  }, [id, setSelectedInvoice]);

  const selectedInvoice = useInvoicesStore((state) => state.selectedInvoice);

  if (!selectedInvoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen md:ml-[103px] items-start pt-[120px] md:pt-[65px] pb-[56px] md:pb-0 justify-center">
        <main className="flex flex-col h-full w-full md:w-[768px] items-center justify-center mx-4">
          <BackButton path="/" />
          <InvoiceSingleNav invoice={selectedInvoice} />
          <InvoiceDetail invoice={selectedInvoice} />
        </main>
      </div>
    </ProtectedRoute>
  );
}
