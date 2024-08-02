"use client";

import { computeStatusStyles } from "@/components/InvoiceCard/InvoiceCard";
import { Invoice } from "@/types/Invoice";
import { capitalizeFirstLetter } from "../../InvoiceCard/InvoiceCard";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/UIState/useUIStore";
import { useInvoicesStore } from "@/stores/InvoicesState/useInvoicesStore";

interface InvoiceSingleNavProps {
    invoice: Invoice;
}

export default function InvoiceSingleNav({ invoice }: InvoiceSingleNavProps) {
    const { setSelectedInvoice } = useInvoicesStore((state) => ({
        setSelectedInvoice: state.setSelectedInvoice,
    }));

    const { setSheetOpen, setSelectedEditorMode } = useUIStore((state) => ({
        setSheetOpen: state.setSheetOpen,
        setSelectedEditorMode: state.setSelectedEditorMode,
    }));

    const handleToggleSheet = () => {
        setSelectedInvoice(invoice);
        setSelectedEditorMode("edit");
        setSheetOpen(true);
    };

    const statusIntent = computeStatusStyles(invoice.status);

    return (
        <>
            <div className="bg-white dark:bg-[#1E2139] w-full flex justify-between h-[88px] px-6">
                <div className="flex justify-between w-full md:w-auto items-center space-x-4">
                    <span className="text-[#858BB2] dark:[#DFE3FA] text-[13px]">
                        Status
                    </span>
                    <div className="relative px-4 py-1 w-[106px] flex items-center justify-center">
                        <div
                            className={`absolute inset-0 rounded-md ${statusIntent.background}`}
                        ></div>
                        <div className="relative px-2 py-1 rounded-full flex items-center">
                            <span
                                className={`inline-block w-2 h-2 rounded-full mr-2 ${statusIntent.iconColor} ${statusIntent.darkModeIconColor}`}
                            ></span>
                            <span
                                className={`flex items-center font-semibold pt-[3px] ${statusIntent.textColor} ${statusIntent.darkModeTextColor}`}
                            >
                                {capitalizeFirstLetter(invoice.status)}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex items-center space-x-2">
                    <Button
                        onClick={handleToggleSheet}
                        className="bg-[#F9FAFE] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:hover:bg-[#FFFFFF] dark:hover:text-[#7E88C3] cursor-pointer transition-colors px-4 rounded-3xl text-[#7E88C3] dark:text-[#DFE3FA] font-semibold text-sm h-[48px] flex items-center"
                    >
                        Edit
                    </Button>
                    <Button className="bg-[#EC5757] hover:bg-[#FF9797] cursor-pointer transition-colors px-4 rounded-3xl text-white font-semibold text-sm h-[48px] flex items-center">
                        Delete
                    </Button>
                    <Button className="bg-primary dark:hover:bg-[#9277FF] transition-colors px-4 rounded-3xl text-white font-semibold text-sm h-[48px] flex items-center">
                        Mark as Paid
                    </Button>
                </div>
            </div>
            <div className="bg-white fixed md:hidden bottom-0 dark:bg-[#1E2139] w-full flex justify-between h-[88px] px-6">
                <div className="flex md:hidden items-center space-x-2 w-full">
                    <Button className="bg-[#F9FAFE] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:hover:bg-[#FFFFFF] dark:hover:text-[#7E88C3] cursor-pointer transition-colors px-4 rounded-3xl text-[#7E88C3] dark:text-[#DFE3FA] font-semibold text-sm h-[48px] flex items-center">
                        Edit
                    </Button>
                    <Button className="bg-[#EC5757] hover:bg-[#FF9797] cursor-pointer transition-colors px-4 rounded-3xl text-white font-semibold text-sm h-[48px] flex items-center">
                        Delete
                    </Button>
                    <Button className="bg-primary flex-1 w-full dark:hover:bg-[#9277FF] transition-colors px-4 rounded-3xl text-white font-semibold text-sm h-[48px] flex items-center">
                        Mark as Paid
                    </Button>
                </div>
            </div>
        </>
    );
}
