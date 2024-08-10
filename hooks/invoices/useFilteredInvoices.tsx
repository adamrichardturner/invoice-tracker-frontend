import { useInvoicesStore } from "@/stores/InvoicesState/useInvoicesStore";
import { useUIStore } from "@/stores/UIState/useUIStore";

const useFilteredInvoices = () => {
  const { invoices } = useInvoicesStore((state) => ({
    invoices: state.invoices,
  }));

  const selectedFilters = useUIStore((state) => state.selectedFilters);
  const filteredByStatus =
    selectedFilters.length > 0
      ? invoices.filter((invoice) => selectedFilters.includes(invoice.status))
      : invoices;

  const filteredInvoices = filteredByStatus.sort((a, b) => {
    const dateA = new Date(a.invoice_date);
    const dateB = new Date(b.invoice_date);
    return dateA.getTime() - dateB.getTime();
  });

  return {
    filteredInvoices,
  };
};

export default useFilteredInvoices;
