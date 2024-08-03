import { StateCreator } from "zustand";

export type FilterOption = "draft" | "pending" | "paid";

export interface IFilterSlice {
  selectedFilters: FilterOption[];
  toggleFilter: (filter: FilterOption) => void;
}

export const createFilterSlice: StateCreator<IFilterSlice> = (set) => ({
  selectedFilters: [],
  toggleFilter: (filter: FilterOption) =>
    set((state) => {
      const isSelected = state.selectedFilters.includes(filter);
      if (isSelected) {
        return {
          selectedFilters: state.selectedFilters.filter(
            (selectedFilter) => selectedFilter !== filter,
          ),
        };
      } else {
        return {
          selectedFilters: [...state.selectedFilters, filter],
        };
      }
    }),
});
