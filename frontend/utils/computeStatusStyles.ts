import { InvoiceStatus } from "@/types/Invoice";

export function computeStatusStyles(status: InvoiceStatus) {
    switch (status) {
        case "draft": {
            return {
                background: "#979797",
                foreground: "#373B53",
            };
        }
        case "pending": {
            return {
                background: "#FF8F00",
                foreground: "#FF8F00",
            };
        }
        case "paid": {
            return {
                background: "#33D69F",
                foreground: "#33D69F",
            };
        }
    }
}
