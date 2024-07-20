"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetClose } from "../ui/sheet";
import { DatePicker } from "@/components/DatePicker";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

const InvoiceFormSchema = z.object({
    bill_from_street_address: z.string(),
    bill_from_city: z.string(),
    bill_from_postcode: z.string(),
    bill_from_country: z.string(),
    bill_to_email: z.string().email("Invalid email format"),
    bill_to_name: z.string(),
    bill_to_street_address: z.string(),
    bill_to_city: z.string(),
    bill_to_postcode: z.string(),
    bill_to_country: z.string(),
    invoice_date: z.date({
        required_error: "Invoice date is required.",
    }),
    payment_terms: z.string(),
    project_description: z.string(),
    item_description: z.string(),
    item_quantity: z.number().positive("Quantity must be positive"),
    item_price: z.number().positive("Price must be positive"),
    item_total: z.number().positive("Total must be positive"),
});

export type InvoiceFormSchemaType = z.infer<typeof InvoiceFormSchema>;

export function InvoiceForm() {
    const form = useForm<InvoiceFormSchemaType>({
        resolver: zodResolver(InvoiceFormSchema),
    });

    const onSubmit = (data: InvoiceFormSchemaType) => console.log(data);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-2">
                    <div className="flex flex-col justify-start items-start space-y-3">
                        <h3 className="text-primary font-semibold text-sm tracking-[-0.25px]">
                            Bill From
                        </h3>
                        <FormField
                            control={form.control}
                            name="bill_from_street_address"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Street Address</FormLabel>
                                    <Input {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-row items-center gap-4">
                            <FormField
                                control={form.control}
                                name="bill_from_city"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>City</FormLabel>
                                        <Input {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bill_from_postcode"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Post Code</FormLabel>
                                        <Input {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bill_from_country"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Country</FormLabel>
                                        <Input {...field} />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="text-primary font-semibold text-sm tracking-[-0.25px]">
                        Bill To
                    </h3>
                    <FormField
                        control={form.control}
                        name="bill_to_name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Client's Name</FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bill_to_email"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Client's Email</FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bill_to_street_address"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Street Address</FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row items-center gap-4">
                        <FormField
                            control={form.control}
                            name="bill_to_city"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>City</FormLabel>
                                    <Input {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bill_to_postcode"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Post Code</FormLabel>
                                    <Input {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bill_to_country"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Country</FormLabel>
                                    <Input {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <DatePicker
                        control={form.control}
                        name="invoice_date"
                        label="Invoice Date"
                    />
                    <FormField
                        control={form.control}
                        name="payment_terms"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Payment Terms</FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="project_description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Project Description</FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="item_description"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Item Description</FormLabel>
                                <Input {...field} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-row items-center gap-4">
                        <FormField
                            control={form.control}
                            name="item_quantity"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Item Quantity</FormLabel>
                                    <Input type="number" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="item_price"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Item Price</FormLabel>
                                    <Input type="number" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="item_total"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Item Total</FormLabel>
                                    <Input type="number" {...field} />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div>
                    <SheetClose asChild>
                        <Button
                            type="submit"
                            className="bg-primary-foreground text-white"
                        >
                            Save changes
                        </Button>
                    </SheetClose>
                </div>
            </form>
        </Form>
    );
}
