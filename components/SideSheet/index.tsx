"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import SheetToggle from "../Sidebar/SheetToggle/SheetToggle";
import { InvoiceForm } from "../InvoiceForm/index";
import { useUIStore } from "@/stores/UIState/useUIStore";
import { MdKeyboardArrowLeft } from "react-icons/md";

export function SideSheet() {
  const { sheetOpen, setSheetOpen, selectedEditorMode } = useUIStore(
    (state) => ({
      sheetOpen: state.sheetOpen,
      setSheetOpen: state.setSheetOpen,
      selectedEditorMode: state.selectedEditorMode,
    }),
  );

  const isEditing = selectedEditorMode === "edit";

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <SheetToggle />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="top-[30px] bg-white dark:bg-[#141625] overflow-y-auto no-scrollbar px-6 md:px-10 sm:top-[80px] md:top-0 md:left-[103px] w-full max-w-[100vw] sm:max-w-[580px] sm:rounded-tr-3xl sm:rounded-br-3xl"
      >
        <SheetClose className="py-4 md:hidden">
          <div className="flex space-x-4 w-full items-center cursor-pointer">
            <MdKeyboardArrowLeft className="text-primary" />
            <span className="text-[#0C0E16] dark:text-white text-sm font-semibold">
              Go back
            </span>
          </div>
        </SheetClose>
        <SheetHeader className="text-left">
          <SheetTitle>{isEditing ? "Edit Invoice" : "New Invoice"}</SheetTitle>
          <SheetDescription className="pb-8 text-gray-500">
            {isEditing
              ? "Modify the details of your existing invoice."
              : "Create a new invoice by filling out the form below."}
          </SheetDescription>
        </SheetHeader>
        <InvoiceForm />
      </SheetContent>
    </Sheet>
  );
}
