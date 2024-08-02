import { useState, useCallback, useEffect } from "react";
import {
    getInvoices,
    createInvoice,
    getInvoiceById,
} from "@/services/invoiceService";
import { toast } from "sonner";
import { InvoiceFormSchemaType } from "@/components/InvoiceForm";
import { useInvoicesStore } from "@/stores/InvoicesState/useInvoicesStore";

const useInvoices = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [invoicesLoaded, setInvoicesLoaded] = useState(true);
    const {
        invoices,
        addInvoices,
        addSingleInvoice,
        selectedInvoiceId,
        setSelectedInvoiceId,
    } = useInvoicesStore();

    const getSingleInvoice = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const invoice = await getInvoiceById(id);
            return invoice;
        } catch (error) {
            if (error instanceof Error) {
                setError(
                    error.message ||
                        "An unknown error occurred while fetching the invoice",
                );
            }
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchInvoices = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getInvoices();
            addInvoices(data);
            setInvoicesLoaded(true);
        } catch (error) {
            if (error instanceof Error) {
                setError(
                    error.message ||
                        "An unknown error occurred while fetching invoices",
                );
            }
        } finally {
            setLoading(false);
        }
    }, [addInvoices]);

    const addInvoice = useCallback(
        async (invoiceData: InvoiceFormSchemaType) => {
            setLoading(true);
            setError(null);
            try {
                const newInvoice = await createInvoice(invoiceData);
                addSingleInvoice(newInvoice);
                toast("Invoice created");
            } catch (error) {
                if (error instanceof Error) {
                    setError(
                        error.message ||
                            "An unknown error occurred while creating an invoice",
                    );
                    toast("Error creating invoice");
                }
            } finally {
                setLoading(false);
            }
        },
        [addSingleInvoice],
    );

    useEffect(() => {
        fetchInvoices();
    }, []);

    return {
        invoices,
        loading,
        error,
        fetchInvoices,
        addInvoice,
        getSingleInvoice,
        invoicesLoaded,
        selectedInvoiceId,
        setSelectedInvoiceId,
    };
};

export default useInvoices;
