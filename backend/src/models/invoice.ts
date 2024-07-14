export interface Invoice {
    id: string;
    user_id: string;
    client_id: string;
    status: "draft" | "pending" | "paid";
    project_description?: string;
    invoice_date: Date;
    payment_terms: "Net 30 Days" | "14 Days" | "7 Days";
    total_amount: number;
    created_at?: Date;
    updated_at?: Date;
}
