import { Invoice, InvoiceStatus } from "@/types/Invoice";
import { StateCreator } from "zustand";

export interface IInvoicesSlice {
  invoices: Invoice[];
  selectedInvoice?: Invoice;
  addInvoices: (invoices: Invoice[]) => void;
  addSingleInvoice: (invoice: Invoice) => void;
  setSelectedInvoice: (invoice: Invoice | undefined) => void;
  updateInvoice: (updatedInvoice: Invoice) => void;
  updateInvoiceStatus: (id: string, status: InvoiceStatus) => void;
  deleteInvoice: (id: string) => void;
}

export const createInvoicesSlice: StateCreator<IInvoicesSlice> = (set) => ({
  invoices: [],
  addInvoices: (invoices: Invoice[]) =>
    set(() => ({
      invoices,
    })),
  addSingleInvoice: (invoice: Invoice) =>
    set((state) => ({
      invoices: [...state.invoices, invoice],
    })),
  setSelectedInvoice: (invoice: Invoice | undefined) =>
    set(() => ({
      selectedInvoice: invoice,
    })),
  updateInvoice: (updatedInvoice: Invoice) =>
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice,
      ),
      selectedInvoice:
        state.selectedInvoice?.id === updatedInvoice.id
          ? updatedInvoice
          : state.selectedInvoice,
    })),
  updateInvoiceStatus: (id: string, status: InvoiceStatus) =>
    set((state) => ({
      invoices: state.invoices.map((invoice) =>
        invoice.id === id ? { ...invoice, status } : invoice,
      ),
      selectedInvoice:
        state.selectedInvoice?.id === id
          ? { ...state.selectedInvoice, status }
          : state.selectedInvoice,
    })),
  deleteInvoice: (id: string) =>
    set((state) => ({
      invoices: state.invoices.filter((invoice) => invoice.id !== id),
      selectedInvoice:
        state.selectedInvoice?.id === id ? undefined : state.selectedInvoice,
    })),
});
