import { InvoiceItem } from "./InvoiceItem";

export type PaymentTerms = "Net 30 Days" | "14 Days" | "7 Days";
export type InvoiceStatus = "draft" | "pending" | "paid";

export interface Invoice {
    id: string;
    bill_from_street_address: string;
    bill_from_city: string;
    bill_from_postcode: string;
    bill_from_country: string;
    bill_to_email: string;
    bill_to_name: string;
    bill_to_street_address: string;
    bill_to_city: string;
    bill_to_postcode: string;
    bill_to_country: string;
    invoice_date: Date;
    payment_terms: PaymentTerms;
    project_description: string;
    status: InvoiceStatus;
    created_at?: Date;
    updated_at?: Date;
    items: InvoiceItem[];
    invoice_total: number;
}
