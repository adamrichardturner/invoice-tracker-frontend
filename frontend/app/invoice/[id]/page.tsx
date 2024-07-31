import { getInvoiceById } from "@/services/invoiceService";
import { Invoice } from "@/types/Invoice";
import { Sidebar } from "lucide-react";

type Props = {
    params: {
        id: string;
    };
};

export default async function InvoicePage({ params }: Props) {
    const { id } = params;
    const res = await getInvoiceById(id);
    const invoice: Invoice = await res;

    if (!invoice) {
        return <div>Invoice not found</div>;
    }

    return (
        <div className="flex min-h-screen md:ml-[103px] items-start pt-[120px] md:pt-[78px] justify-center">
            <Sidebar />
            <main className="flex flex-col h-full w-full md:w-[768px] items-center justify-center mx-4"></main>
        </div>
    );
}
