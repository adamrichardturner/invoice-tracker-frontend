import { Invoice } from "@/types/Invoice";
import { StateCreator } from "zustand";

export interface IInvoicesSlice {
    invoices: Invoice[];
    selectedInvoice?: Invoice;
    selectedInvoiceId?: string;
    addInvoices: (invoices: Invoice[]) => void;
    addSingleInvoice: (invoice: Invoice) => void;
    setSelectedInvoiceId: (id: string) => void;
    setSelectedInvoice: (invoice: Invoice) => void;
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
    setSelectedInvoiceId: (id: string) =>
        set(() => ({
            selectedInvoiceId: id,
        })),
    setSelectedInvoice: (invoice: Invoice) =>
        set(() => ({
            selectedInvoice: invoice,
        })),
});
