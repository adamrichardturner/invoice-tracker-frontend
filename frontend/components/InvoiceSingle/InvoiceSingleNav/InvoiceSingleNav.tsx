import { computeStatusStyles } from "@/components/InvoiceCard/InvoiceCard";
import { InvoiceStatus } from "@/types/Invoice";
import { capitalizeFirstLetter } from "../../InvoiceCard/InvoiceCard";
import { Button } from "@/components/ui/button";

interface InvoiceSingleNavProps {
    status: InvoiceStatus;
    id: string;
}

export default function InvoiceSingleNav({ status }: InvoiceSingleNavProps) {
    const statusIntent = computeStatusStyles(status);
    return (
        <div className="bg-white dark:bg-[#1E2139] w-full flex justify-between p-6">
            <div className="flex items-center space-x-4">
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
                            {capitalizeFirstLetter(status)}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex">
                <Button className="bg-[#F9FAFE] dark:bg-[#252945] cursor-pointer transition-colors px-4 rounded-3xl text-[#7E88C3] dark:text-[#DFE3FA] font-semibold text-sm h-[48px] flex items-center">
                    Edit
                </Button>
                <Button className="bg-[#EC5757] hover:bg-[#FF9797] cursor-pointer transition-colors px-4 rounded-3xl text-white font-semibold text-sm h-[48px] flex items-center">
                    Delete
                </Button>
                <Button className="bg-primary-foreground transition-colors px-4 rounded-3xl text-white font-semibold text-sm h-[48px] flex items-center">
                    Mark as Paid
                </Button>
            </div>
        </div>
    );
}
