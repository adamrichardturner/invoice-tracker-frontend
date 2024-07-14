import { Request, Response } from "express";
import { pool } from "../config/database";

export const createInvoice = async (req: Request, res: Response) => {
    const {
        user_id,
        client_id,
        status,
        project_description,
        invoice_date,
        payment_terms,
        items,
    } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO invoices (user_id, client_id, status, project_description, invoice_date, payment_terms) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [
                user_id,
                client_id,
                status,
                project_description,
                invoice_date,
                payment_terms,
            ],
        );
        const invoice_id = result.rows[0].id;

        const itemQueries = items.map((item: any) =>
            pool.query(
                "INSERT INTO invoice_items (invoice_id, description, quantity, unit_price) VALUES ($1, $2, $3, $4)",
                [invoice_id, item.description, item.quantity, item.unit_price],
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
        const result = await pool.query("SELECT * FROM invoices");
        res.json(result.rows);
    } catch (err) {
        res.status(500).send("Server error.");
    }
};

export const updateInvoice = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status, project_description, invoice_date, payment_terms } =
        req.body;
    try {
        const result = await pool.query(
            "UPDATE invoices SET status = $1, project_description = $2, invoice_date = $3, payment_terms = $4 WHERE id = $5 RETURNING *",
            [status, project_description, invoice_date, payment_terms, id],
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
