"use client";

import { computeStatusStyles } from "@/components/InvoiceCard/InvoiceCard";
import { Invoice, InvoiceStatus } from "@/types/Invoice";
import { capitalizeFirstLetter } from "../../InvoiceCard/InvoiceCard";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/UIState/useUIStore";
import useSelectedInvoice from "@/hooks/invoices/useSelectedInvoice";
import { useRouter } from "next/navigation";
import { DeleteDialog } from "@/components/DeleteDialog/DeleteDialog";

interface InvoiceSingleNavProps {
  invoice: Invoice;
}

export default function InvoiceSingleNav({ invoice }: InvoiceSingleNavProps) {
  const router = useRouter();
  const { deleteSelectedInvoice, updateSelectedInvoiceStatus } =
    useSelectedInvoice();

  const { setSheetOpen, setSelectedEditorMode } = useUIStore((state) => ({
    setSheetOpen: state.setSheetOpen,
    setSelectedEditorMode: state.setSelectedEditorMode,
  }));

  const handleToggleSheet = () => {
    setSelectedEditorMode("edit");
    setSheetOpen(true);
  };

  const handleDeleteInvoice = () => {
    router.push("/");
    deleteSelectedInvoice();
    setSelectedEditorMode("create");
  };

  const updateInvoiceStatus = (status: InvoiceStatus) => {
    updateSelectedInvoiceStatus(status);
  };

  const statusIntent = computeStatusStyles(invoice.status);

  return (
    <>
      <div className="bg-white dark:bg-[#1E2139] w-full flex justify-between h-[88px] px-6 rounded-lg shadow-md">
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
          <DeleteDialog onDelete={handleDeleteInvoice} invoiceId={invoice.id} />
          <Button
            onClick={() =>
              handleStatusClick(invoice.status, updateInvoiceStatus)
            }
            className={displayStatusStyles(invoice.status).buttonStyles}
          >
            {displayStatusStyles(invoice.status).buttonText}
          </Button>
        </div>
      </div>
      <div className="bg-white fixed md:hidden bottom-0 dark:bg-[#1E2139] w-full flex justify-between h-[88px] px-6">
        <div className="flex md:hidden items-center space-x-2 w-full">
          <Button
            onClick={handleToggleSheet}
            className="bg-[#F9FAFE] hover:bg-[#DFE3FA] dark:bg-[#252945] dark:hover:bg-[#FFFFFF] dark:hover:text-[#7E88C3] cursor-pointer transition-colors px-4 rounded-3xl text-[#7E88C3] dark:text-[#DFE3FA] font-semibold text-sm h-[48px] flex items-center"
          >
            Edit
          </Button>
          <DeleteDialog onDelete={handleDeleteInvoice} invoiceId={invoice.id} />
          <Button
            onClick={() =>
              handleStatusClick(invoice.status, updateInvoiceStatus)
            }
            className={displayStatusStyles(invoice.status).buttonStyles}
          >
            {displayStatusStyles(invoice.status).buttonText}
          </Button>
        </div>
      </div>
    </>
  );
}

function handleStatusClick(
  status: InvoiceStatus,
  updateInvoiceStatus: (status: InvoiceStatus) => void,
) {
  switch (status) {
    case "draft": {
      return updateInvoiceStatus("pending");
    }
    case "pending": {
      return updateInvoiceStatus("paid");
    }
    case "paid": {
      return updateInvoiceStatus("pending");
    }
    default:
      return;
  }
}

function displayStatusStyles(status: InvoiceStatus) {
  switch (status) {
    case "draft": {
      return {
        buttonText: "Mark as Pending",
        buttonStyles:
          "bg-[#FFF9F0] dark:bg-[#2B2736] text-[#FF8F00] dark:text-[#FF8F00] flex-1 w-full dark:hover:bg-[#2B2736] hover:bg-[#FFF9F0] transition-colors px-4 rounded-3xl font-semibold text-sm h-[48px] flex items-center",
      };
    }
    case "pending": {
      return {
        buttonText: "Mark as Paid",
        buttonStyles:
          "bg-primary flex-1 w-full transition-colors px-4 rounded-3xl text-white font-semibold text-sm h-[48px] flex items-center",
      };
    }
    case "paid": {
      return {
        buttonText: "Mark as Pending",
        buttonStyles:
          "bg-[#FFF9F0] dark:bg-[#2B2736] text-[#FF8F00] dark:text-[#FF8F00] flex-1 w-full dark:hover:bg-[#2B2736] hover:bg-[#FFF9F0] transition-colors px-4 rounded-3xl font-semibold text-sm h-[48px] flex items-center",
      };
    }
    default:
      return {
        buttonText: "Unknown Status",
        buttonStyles:
          "bg-gray-300 flex-1 w-full transition-colors px-4 rounded-3xl text-black font-semibold text-sm h-[48px] flex items-center",
      };
  }
}
