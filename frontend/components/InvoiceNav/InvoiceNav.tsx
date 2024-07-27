import { InvoiceFilter } from "./InvoiceFilter/InvoiceFilter";
import OvalPlus from "@/assets/ui/oval-plus.svg";
import Image from "next/image";

export default function InvoiceNav() {
    return (
        <div className="flex flex-row w-full justify-between text-black">
            <div>
                <h2 className="text-heading text-4xl font-bold tracking-[-1.13px]">
                    Invoices
                </h2>
                <span className="text-xs tracking-[-0.1px] text-fadedBody">
                    There are 4 pending invoices
                </span>
            </div>
            <div className="flex items-center">
                <InvoiceFilter />
                <div className="cursor-pointer flex items-center transition-colors justify-between space-x-3 bg-primary hover:bg-primary-foreground leading-none text-white pl-2 pr-4 py-2 rounded-3xl">
                    <Image
                        src={OvalPlus}
                        width={32}
                        height={32}
                        alt="Plus Button"
                    />
                    <div className="flex items-center leading-tight text-[14px] justify-start align-middle">
                        New Invoice
                    </div>
                </div>
            </div>
        </div>
    );
}
