import { create } from "zustand";
import { createFilterSlice, IFilterSlice } from "./slices/filterSlice";

export type IFilterStore = IFilterSlice;

export const useUIStore = create<IFilterStore>()((...a) => ({
    ...createFilterSlice(...a),
}));
