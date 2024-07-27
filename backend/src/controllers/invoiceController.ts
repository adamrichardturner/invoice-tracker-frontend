import { Request, Response } from "express";
import { pool } from "../config/database";
import { InvoiceItem } from "../models/invoiceItem";

export const createInvoice = async (req: Request, res: Response) => {
    const {
        bill_from_street_address,
        bill_from_city,
        bill_from_postcode,
        bill_from_country,
        bill_to_email,
        bill_to_name,
        bill_to_street_address,
        bill_to_city,
        bill_to_postcode,
        bill_to_country,
        invoice_date,
        payment_terms,
        project_description,
        items,
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO invoices (
                bill_from_street_address, bill_from_city, bill_from_postcode, bill_from_country,
                bill_to_email, bill_to_name, bill_to_street_address, bill_to_city,
                bill_to_postcode, bill_to_country, invoice_date, payment_terms,
                project_description, status
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, 'draft'
            ) RETURNING *`,
            [
                bill_from_street_address,
                bill_from_city,
                bill_from_postcode,
                bill_from_country,
                bill_to_email,
                bill_to_name,
                bill_to_street_address,
                bill_to_city,
                bill_to_postcode,
                bill_to_country,
                invoice_date,
                payment_terms,
                project_description,
            ],
        );
        const invoice_id = result.rows[0].id;

        const itemQueries = items.map((item: InvoiceItem) =>
            pool.query(
                `INSERT INTO invoice_items (
                    invoice_id, item_description, item_quantity, item_price, item_total
                ) VALUES ($1, $2, $3, $4, $5)`,
                [
                    invoice_id,
                    item.item_description,
                    item.item_quantity,
                    item.item_price,
                    item.item_quantity * item.item_price,
                ],
            ),
        );

        await Promise.all(itemQueries);

        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send("Server error.");
    }
};

export const getInvoices = async (req: Request, res: Response) => {
    try {
        const invoicesResult = await pool.query("SELECT * FROM invoices");
        const invoices = invoicesResult.rows;

        const invoicePromises = invoices.map(async (invoice) => {
            const itemsResult = await pool.query(
                "SELECT * FROM invoice_items WHERE invoice_id = $1",
                [invoice.id],
            );
            return {
                ...invoice,
                items: itemsResult.rows,
            };
        });

        const invoicesWithItems = await Promise.all(invoicePromises);

        res.json(invoicesWithItems);
    } catch (err) {
        res.status(500).send("Server error.");
    }
};

export const updateInvoice = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        status,
        project_description,
        invoice_date,
        payment_terms,
        bill_from_street_address,
        bill_from_city,
        bill_from_postcode,
        bill_from_country,
        bill_to_name,
        bill_to_email,
        bill_to_street_address,
        bill_to_city,
        bill_to_postcode,
        bill_to_country,
    } = req.body;
    try {
        const result = await pool.query(
            `UPDATE invoices SET
                status = $1,
                project_description = $2,
                invoice_date = $3,
                payment_terms = $4,
                bill_from_street_address = $5,
                bill_from_city = $6,
                bill_from_postcode = $7,
                bill_from_country = $8,
                bill_to_name = $9,
                bill_to_email = $10,
                bill_to_street_address = $11,
                bill_to_city = $12,
                bill_to_postcode = $13,
                bill_to_country = $14,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = $15 RETURNING *`,
            [
                status,
                project_description,
                invoice_date,
                payment_terms,
                bill_from_street_address,
                bill_from_city,
                bill_from_postcode,
                bill_from_country,
                bill_to_name,
                bill_to_email,
                bill_to_street_address,
                bill_to_city,
                bill_to_postcode,
                bill_to_country,
                id,
            ],
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send("Server error.");
    }
};

export const deleteInvoice = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM invoices WHERE id = $1", [id]);
        res.send("Invoice deleted successfully.");
    } catch (err) {
        res.status(500).send("Server error.");
    }
};
