import { Request, Response } from "express";
import { pool } from "../config/database";
import { InvoiceItem } from "../models/invoiceItem";
import Decimal from "decimal.js";

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
        status,
    } = req.body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // Calculate the total price of all items
        let invoiceTotal = new Decimal(0);
        for (const item of items) {
            const itemTotal = new Decimal(item.item_price).mul(
                item.item_quantity,
            );
            invoiceTotal = invoiceTotal.add(itemTotal);
        }

        // Convert invoiceTotal to a number for insertion
        const invoiceTotalNumber = invoiceTotal.toNumber();

        const result = await client.query(
            `INSERT INTO invoices (
                bill_from_street_address, bill_from_city, bill_from_postcode, bill_from_country,
                bill_to_email, bill_to_name, bill_to_street_address, bill_to_city,
                bill_to_postcode, bill_to_country, invoice_date, payment_terms,
                project_description, status, invoice_total
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
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
                status,
                invoiceTotalNumber,
            ],
        );
        const invoice_id = result.rows[0].id;
        for (const item of items) {
            await client.query(
                `INSERT INTO invoice_items (
                    invoice_id, item_description, item_quantity, item_price, item_total
                ) VALUES ($1, $2, $3, $4, $5)`,
                [
                    invoice_id,
                    item.item_description,
                    item.item_quantity,
                    item.item_price,
                    new Decimal(item.item_price)
                        .mul(item.item_quantity)
                        .toNumber(),
                ],
            );
        }

        await client.query("COMMIT");

        res.status(201).json(result.rows[0]);
    } catch (err) {
        await client.query("ROLLBACK");
        console.error("Error in createInvoice:", err);
        if (err instanceof Error) {
            res.status(500).json({
                error: "Server error",
                message: err.message,
                stack: err.stack,
            });
        } else {
            res.status(500).json({
                error: "Server error",
                message: "An unknown error occurred",
            });
        }
    } finally {
        client.release();
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

export const getInvoiceById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const invoiceResult = await pool.query(
            "SELECT * FROM invoices WHERE id = $1",
            [id],
        );
        if (invoiceResult.rows.length === 0) {
            return res.status(404).json({ message: "Invoice not found" });
        }

        const invoice = invoiceResult.rows[0];

        const itemsResult = await pool.query(
            "SELECT * FROM invoice_items WHERE invoice_id = $1",
            [id],
        );
        invoice.items = itemsResult.rows;

        res.json(invoice);
    } catch (err: unknown) {
        console.error("Error in getInvoiceById:", err);
        if (err instanceof Error) {
            res.status(500).json({
                error: "Server error",
                message: err.message,
                stack: err.stack,
            });
        } else {
            res.status(500).json({
                error: "Server error",
                message: "An unknown error occurred",
            });
        }
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
