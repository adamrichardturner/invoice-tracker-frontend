import React from "react";
import { useController, Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { InvoiceFormSchemaType } from "../../InvoiceForm";
import { FaChevronDown } from "react-icons/fa6";

interface PaymentTermsDropdownProps {
  control: Control<InvoiceFormSchemaType>;
  name: "payment_terms";
}

export function PaymentTermsDropdown({
  control,
  name,
}: PaymentTermsDropdownProps) {
  const { field } = useController({
    name,
    control,
    defaultValue: "Net 30 Days",
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="w-full text-heading text-left">
        <Button
          variant="ghost"
          className="bg-foreground text-left text-[16px] font-normal pl-3 pt-[12px] flex items-center justify-between border border-input"
        >
          {field.value}
          <FaChevronDown className="text-xs" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {["Net 30 Days", "14 Days", "7 Days"].map((term) => (
          <DropdownMenuCheckboxItem
            key={term}
            checked={field.value === term}
            onCheckedChange={() => field.onChange(term)}
          >
            {term}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
