export interface InvoiceItem {
    id: string;
    invoice_id: string;
    description: string;
    quantity: number;
    unit_price: number;
    total_price: number;
    created_at?: Date;
}
