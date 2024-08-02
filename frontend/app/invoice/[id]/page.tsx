import BackButton from "@/components/BackButton/BackButton";
import InvoiceSingleNav from "@/components/InvoiceSingle/InvoiceSingleNav/InvoiceSingleNav";
import { getInvoiceById } from "@/services/invoiceService";
import { Invoice } from "@/types/Invoice";

type Props = {
    params: {
        id: string;
    };
};

export default async function InvoicePage({ params }: Props) {
    const { id } = params;
    const invoice: Invoice = await getInvoiceById(id);

    if (!invoice) {
        return <div>Invoice not found</div>;
    }

    return (
        <div className="flex min-h-screen md:ml-[103px] items-start pt-[120px] md:pt-[65px] justify-center">
            <main className="flex flex-col h-full w-full md:w-[768px] items-center justify-center mx-4">
                <BackButton path="/" />
                <InvoiceSingleNav invoice={invoice} />
            </main>
        </div>
    );
}
