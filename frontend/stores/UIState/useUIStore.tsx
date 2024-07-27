import { create } from "zustand";
import { createFilterSlice, IFilterSlice } from "./slices/filterSlice";
import { createFormSlice, IFormSlice } from "./slices/formSlice";

export type IUIStore = IFilterSlice & IFormSlice;

export const useUIStore = create<IUIStore>()((...a) => ({
    ...createFilterSlice(...a),
    ...createFormSlice(...a),
}));
