import { Invoice } from "@/types/Invoice";
import { addDaysToDateFromTerm } from "@/utils/addDaysToDate";
import { MdKeyboardArrowRight } from "react-icons/md";

interface InvoiceCardProps {
    invoice: Invoice;
}

export const InvoiceCard = ({ invoice }: InvoiceCardProps) => {
    if (!invoice) {
        return null;
    }
    const invoiceDue = addDaysToDateFromTerm(
        invoice.invoice_date,
        invoice.payment_terms,
    );

    const invoiceTotal = (invoice.items || []).reduce((acc, item) => {
        const itemTotalPrice = item.item_price * item.item_quantity;
        return acc + itemTotalPrice;
    }, 0);

    const formattedInvoiceTotal = invoiceTotal.toFixed(2);

    const statusIntent = computeStatusStyles(invoice.status);
    const formattedStatus = capitalizeFirstLetter(invoice.status);

    return (
        <div className="w-full cursor-pointer bg-invoiceCard rounded-md flex justify-between transition-colors items-center py-[30px] px-4 md:h-[72px] shadow-md border border-transparent md:hover:border md:hover:border-primary">
            <div className="hidden md:flex flex-row items-center justify-center h-full pl-4">
                <span className="flex items-center align-middle h-full leading-none w-[60px]">
                    <span className="flex items-center text-[#7E88C3] dark:text-[#888EB0] pr-0.5">
                        #
                    </span>
                    <span className="flex items-center text-heading font-bold">
                        {invoice.id}
                    </span>
                </span>
                <span className="text-[#7E88C3] dark:text-[#DFE3FA] w-[200px] text-sm font-[400]">
                    Due {invoiceDue}
                </span>
                <span className="text-[#858BB2] dark:text-white">
                    {invoice.bill_to_name}
                </span>
            </div>
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
                        £ {formattedInvoiceTotal}
                    </span>
                </div>
            </div>
            <div className="text-right hidden md:flex items-center">
                <span className="text-heading mr-8 font-bold">
                    £ {formattedInvoiceTotal}
                </span>
                <div className="relative px-4 py-1 w-[106px] flex items-center justify-center">
                    <div
                        className={`absolute inset-0 rounded-md ${statusIntent.background} opacity-15`}
                    ></div>
                    <div className="relative px-2 py-1 rounded-full flex items-center">
                        <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${statusIntent.iconColor} ${statusIntent.darkModeIconColor}`}
                        ></span>
                        <span
                            className={`flex items-center font-semibold pt-0.5 ${statusIntent.textColor} ${statusIntent.darkModeTextColor}`}
                        >
                            {formattedStatus}
                        </span>
                    </div>
                </div>
                <div className="ml-4 text-primary text-lg">
                    <MdKeyboardArrowRight />
                </div>
            </div>
            <div className="text-right flex flex-col md:hidden items-center space-y-4 pr-2">
                <span className="text-[#858BB2] dark:text-white w-full">
                    {invoice.bill_to_name}
                </span>
                <div className="relative inline-block px-4 py-1">
                    <div
                        className={`absolute inset-0 rounded-md ${statusIntent.background} opacity-15`}
                    ></div>
                    <div className="relative px-2 py-1 rounded-full flex items-center">
                        <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${statusIntent.iconColor} ${statusIntent.darkModeIconColor}`}
                        ></span>
                        <span
                            className={`flex items-center font-semibold pt-0.5 ${statusIntent.textColor} ${statusIntent.darkModeTextColor}`}
                        >
                            {formattedStatus}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

function computeStatusStyles(status: string) {
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
            background: "bg-green-500",
            textColor: "text-green-500",
            darkModeTextColor: "dark:text-green-400",
            iconColor: "bg-green-500",
            darkModeIconColor: "dark:bg-green-400",
        },
        pending: {
            background: "bg-orange-500",
            textColor: "text-orange-500",
            darkModeTextColor: "dark:text-orange-400",
            iconColor: "bg-orange-500",
            darkModeIconColor: "dark:bg-orange-400",
        },
        draft: {
            background: "bg-gray-500",
            textColor: "text-gray-500",
            darkModeTextColor: "dark:text-gray-400",
            iconColor: "bg-gray-500",
            darkModeIconColor: "dark:bg-gray-400",
        },
    };

    return (
        statusClasses[status] || {
            background: "bg-gray-500",
            textColor: "text-gray-600",
            darkModeTextColor: "dark:text-gray-700",
            iconColor: "bg-gray-600",
            darkModeIconColor: "dark:bg-gray-700",
        }
    );
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
