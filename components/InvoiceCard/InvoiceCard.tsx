"use client";

import { Invoice } from "@/types/Invoice";
import { addDaysToDateFromTerm } from "@/utils/addDaysToDate";
import { MdKeyboardArrowRight } from "react-icons/md";
import { SkeletonInvoiceCard } from "./SkeletonInvoiceCard";
import Link from "next/link";
import useSelectedInvoice from "@/hooks/invoices/useSelectedInvoice";
interface InvoiceCardProps {
    invoice: Invoice;
}

export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
    const { selectInvoice } = useSelectedInvoice();
    if (!invoice) {
        return <SkeletonInvoiceCard />;
    }

    const invoiceDue = addDaysToDateFromTerm(
        invoice.invoice_date,
        invoice.payment_terms,
    );

    const statusIntent = computeStatusStyles(invoice.status);
    const formattedStatus = capitalizeFirstLetter(invoice.status);

    return (
        <Link
            href={`/invoice/${invoice.id}`}
            className="w-full cursor-pointer bg-invoiceCard rounded-md flex justify-between transition-colors items-center py-[30px] px-4 md:h-[72px] shadow-md border border-transparent md:hover:border md:hover:border-primary"
            onClick={() => selectInvoice(invoice)}
        >
            {/* Desktop Card */}
            <div className="hidden md:flex flex-row items-center w-full flex-1 justify-center h-full pl-4">
                <span className="flex items-center align-middle h-full leading-none w-[60px]">
                    <span className="flex items-center text-[#7E88C3] dark:text-[#888EB0] pr-0.5">
                        #
                    </span>
                    <span className="flex items-center text-heading font-bold">
                        {invoice.id}
                    </span>
                </span>
                <span className="text-[#7E88C3] flex-1 dark:text-[#DFE3FA] text-sm font-[400]">
                    Due {invoiceDue}
                </span>
                <span className="text-[#858BB2] flex items-center text-left flex-1 dark:text-white pl-[62px]">
                    {invoice.bill_to_name}
                </span>
            </div>
            <div className="text-right hidden md:flex flex-1 items-center justify-end">
                <span className="text-heading px-8 font-bold">
                    £ {invoice.invoice_total.toFixed(2)}
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
                            {formattedStatus}
                        </span>
                    </div>
                </div>
                <div className="ml-4 text-primary text-lg">
                    <MdKeyboardArrowRight />
                </div>
            </div>
            {/* Mobile Card */}
            <div className="flex md:hidden flex-col items-center justify-start w-full pl-2 space-y-4">
                <span className="flex justify-start w-full items-center align-middle h-full leading-none">
                    <span className="flex items-center text-[#7E88C3] dark:text-[#888EB0] pr-0.5">
                        #
                    </span>
                    <span className="flex items-center text-heading font-bold">
                        {invoice.id}
                    </span>
                </span>
                <div className="flex flex-col w-full items-center">
                    <span className="text-[#7E88C3] w-full dark:text-[#DFE3FA] text-sm font-[400]">
                        Due {invoiceDue}
                    </span>
                    <span className="text-heading w-full font-bold">
                        £ {invoice.invoice_total.toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="text-right flex flex-col md:hidden items-center space-y-4 pr-2">
                <span className="text-[#858BB2] dark:text-white w-full">
                    {invoice.bill_to_name}
                </span>
                <div className="relative inline-block px-4 py-1">
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
                            {formattedStatus}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export function computeStatusStyles(status: string) {
    const statusClasses: {
        [key: string]: {
            background: string;
            textColor: string;
            darkModeTextColor: string;
            iconColor: string;
            darkModeIconColor: string;
        };
    } = {
        paid: {
            background: "bg-[#F3FDFA] dark:bg-[#202B3F]",
            textColor: "text-[#33D69F]",
            darkModeTextColor: "dark:text-[#2EC693]",
            iconColor: "bg-[#33D69F]",
            darkModeIconColor: "dark:bg-[#2EC693]",
        },
        pending: {
            background: "bg-[#FFF9F0] dark:bg-[#2B2736]",
            textColor: "text-[#FF8F00]",
            darkModeTextColor: "dark:text-[#FF8F00]",
            iconColor: "bg-[#FF8F00]",
            darkModeIconColor: "dark:bg-[#FF8F00]",
        },
        draft: {
            background: "bg-[#F4F4F5] dark:bg-[#2A2C44]",
            textColor: "text-[#373B53]",
            darkModeTextColor: "dark:text-[#DFE3FA]",
            iconColor: "bg-[#373B53]",
            darkModeIconColor: "dark:bg-[#DFE3FA]",
        },
    };

    return (
        statusClasses[status] || {
            background: "bg-gray-500",
            textColor: "text-gray-600",
            darkModeTextColor: "dark:text-[#DFE3FA]",
            iconColor: "bg-[#373B53]",
            darkModeIconColor: "dark:bg-[#DFE3FA]",
        }
    );
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
