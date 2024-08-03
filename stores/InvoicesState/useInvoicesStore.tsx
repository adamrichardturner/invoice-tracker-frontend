import { create } from "zustand";
import { createInvoicesSlice, IInvoicesSlice } from "./slices/invoicesSlice";

export type IInvoicesStore = IInvoicesSlice;

export const useInvoicesStore = create<IInvoicesStore>()((...a) => ({
  ...createInvoicesSlice(...a),
}));
