"use client";

import { InvoiceFilter } from "./InvoiceFilter/InvoiceFilter";
import OvalPlus from "@/assets/ui/oval-plus.svg";
import { useUIStore } from "@/stores/UIState/useUIStore";
import Image from "next/image";

interface InvoiceNavProps {
    invoiceTotal: number;
}

export default function InvoiceNav({ invoiceTotal }: InvoiceNavProps) {
    const { setSheetOpen, setSelectedEditorMode } = useUIStore((state) => ({
        setSheetOpen: state.setSheetOpen,
        setSelectedEditorMode: state.setSelectedEditorMode,
    }));

    const handleToggleSheet = () => {
        setSelectedEditorMode("create");
        setSheetOpen(true);
    };
    return (
        <div className="flex flex-row w-full justify-between text-black">
            <div>
                <h2 className="text-heading text-2xl md:text-4xl font-bold tracking-[-1.13px]">
                    Invoices
                </h2>
                <span className="text-xs md:text-md tracking-[-0.1px] text-fadedBody">
                    {invoiceTotal} invoices
                </span>
            </div>
            <div className="flex items-start space-x-6">
                <div className="flex space-x-4 md:space-x-6">
                    <InvoiceFilter />
                    <div
                        className="cursor-pointer flex items-center transition-colors justify-between space-x-3 bg-primary hover:bg-primary-foreground leading-none text-white pl-2 pr-4 py-2 rounded-3xl"
                        onClick={handleToggleSheet}
                    >
                        <Image
                            src={OvalPlus}
                            width={32}
                            height={32}
                            alt="Plus Button"
                        />
                        <div className="flex items-center leading-tight text-[14px] justify-start align-middle font-[600]">
                            <span className="hidden md:block">New Invoice</span>
                            <span className="md:hidden">New</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
