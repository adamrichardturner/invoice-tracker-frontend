import { useState, useCallback } from "react";
import { getInvoices, getInvoiceById } from "@/services/invoiceService";
import { useInvoicesStore } from "@/stores/InvoicesState/useInvoicesStore";

const useInvoices = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invoicesLoaded, setInvoicesLoaded] = useState(true);
  const { invoices, addInvoices } = useInvoicesStore();

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
          error.message || "An unknown error occurred while fetching invoices",
        );
      }
    } finally {
      setLoading(false);
    }
  }, [addInvoices]);

  return {
    invoices,
    loading,
    error,
    fetchInvoices,
    getSingleInvoice,
    invoicesLoaded,
  };
};

export default useInvoices;
