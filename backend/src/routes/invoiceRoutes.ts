import { Router } from "express";
import {
    createInvoice,
    getInvoices,
    updateInvoice,
    deleteInvoice,
} from "../controllers/invoiceController";

const router = Router();

router.post("/invoices", createInvoice);
router.get("/invoices", getInvoices);
router.put("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

export default router;
