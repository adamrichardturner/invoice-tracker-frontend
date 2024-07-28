// components/SkeletonInvoiceCard/SkeletonInvoiceCard.tsx
import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonInvoiceCard = () => {
    return (
        <div className="w-full cursor-pointer bg-invoiceCard rounded-md flex justify-between transition-colors items-center py-[30px] px-4 md:h-[72px] shadow-md border border-transparent">
            <div className="hidden md:flex flex-row items-center w-full flex-1 justify-center h-full pl-4">
                <Skeleton className="h-6 w-[60px] mr-4" />
                <Skeleton className="h-6 w-[60px] mr-4" />
                <Skeleton className="h-6 w-[100px] mr-4" />
                <Skeleton className="h-6 w-[100px] mr-4" />
            </div>
            <div className="flex md:hidden flex-col items-center justify-start pl-2 space-y-4">
                <Skeleton className="h-6 w-[80px] mr-4" />
                <Skeleton className="h-6 w-[80px] mr-4" />
                <Skeleton className="h-6 w-[80px] mr-4" />
            </div>
            <div className="text-right hidden md:flex items-center">
                <Skeleton className="h-6 w-[80px] mr-4" />
                <div className="relative px-4 py-1 w-[106px] flex items-center justify-center">
                    <Skeleton className="h-6 w-[80px]" />
                </div>
                <Skeleton className="h-6 w-6 ml-4" />
            </div>
            <div className="text-right flex flex-col md:hidden items-center space-y-4 pr-2">
                <Skeleton className="h-6 w-[80px]" />
                <Skeleton className="h-6 w-[80px]" />
            </div>
        </div>
    );
};
