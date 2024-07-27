import { create, StateCreator } from "zustand";

type FilterOption = "all" | "draft" | "pending" | "paid";

export interface IFilterSlice {
    selectedFilter: FilterOption;
    setFilter: (newFilter: FilterOption) => void;
}

export const createFilterSlice: StateCreator<IFilterSlice> = (set) => ({
    selectedFilter: "all",
    setFilter: (newFilter: FilterOption) =>
        set(() => ({
            selectedFilter: newFilter,
        })),
});

export const useUserStore = create(createFilterSlice);
