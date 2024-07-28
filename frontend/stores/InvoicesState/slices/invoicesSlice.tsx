import { Invoice } from "@/types/Invoice";
import { StateCreator } from "zustand";

export interface IInvoicesSlice {
    invoices: Invoice[];
    addInvoices: (invoices: Invoice[]) => void;
    addSingleInvoice: (invoice: Invoice) => void;
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
});
