import { useInvoicesStore } from "@/stores/InvoicesState/useInvoicesStore";
import { useUIStore } from "@/stores/UIState/useUIStore";

const useFilteredInvoices = () => {
  const { invoices } = useInvoicesStore((state) => ({
    invoices: state.invoices,
  }));

  const selectedFilters = useUIStore((state) => state.selectedFilters);
  const filteredInvoices =
    selectedFilters.length > 0
      ? invoices.filter((invoice) => selectedFilters.includes(invoice.status))
      : invoices;

  return {
    filteredInvoices,
  };
};

export default useFilteredInvoices;
