import { StateCreator } from "zustand";

export type FormEditorMode = "create" | "edit";

export interface IFormSlice {
    sheetOpen: boolean;
    setSheetOpen: (isOpen: boolean) => void;
    selectedEditorMode: FormEditorMode;
    setSelectedEditorMode: (mode: FormEditorMode) => void;
}

export const createFormSlice: StateCreator<IFormSlice> = (set) => ({
    sheetOpen: false,
    setSheetOpen: (isOpen: boolean) => set({ sheetOpen: isOpen }),
    selectedEditorMode: "create",
    setSelectedEditorMode: (mode: FormEditorMode) =>
        set({ selectedEditorMode: mode }),
});
