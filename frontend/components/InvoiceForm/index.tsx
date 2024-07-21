"use client";

import React, { useEffect, useState } from "react";
import {
    useForm,
    useFieldArray,
    UseFormSetValue,
    Control,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetClose } from "../ui/sheet";
import { DatePicker } from "@/components/DatePicker";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { FaTrash } from "react-icons/fa";
import { PaymentTermsDropdown } from "./PaymentTermsDropdown";

const InvoiceFormSchema = z.object({
    bill_from_street_address: z.string().min(1, "Street address is required"),
    bill_from_city: z.string().min(1, "City is required"),
    bill_from_postcode: z.string().min(1, "Post code is required"),
    bill_from_country: z.string().min(1, "Country is required"),
    bill_to_email: z.string().email("Invalid email format"),
    bill_to_name: z.string().min(1, "Client's name is required"),
    bill_to_street_address: z.string().min(1, "Street address is required"),
    bill_to_city: z.string().min(1, "City is required"),
    bill_to_postcode: z.string().min(1, "Post code is required"),
    bill_to_country: z.string().min(1, "Country is required"),
    invoice_date: z.date({
        required_error: "Invoice date is required.",
    }),
    payment_terms: z.enum(["Net 30 Days", "14 Days", "7 Days"]),
    project_description: z.string().min(1, "Project description is required"),
    items: z
        .array(
            z.object({
                item_description: z.string().min(1, "Item name is required"),
                item_quantity: z.number().positive("Quantity must be positive"),
                item_price: z
                    .string()
                    .refine((val) => !isNaN(parseFloat(val)), {
                        message: "Must be a valid number",
                    })
                    .refine((val) => parseFloat(val) > 0, {
                        message: "Price must be greater than 0",
                    })
                    .refine((val) => /^\d+(\.\d{0,2})?$/.test(val), {
                        message:
                            "Must be a number with up to two decimal places",
                    }),
                item_total: z.number(),
            }),
        )
        .min(1, "At least one item is required"),
});

export type InvoiceFormSchemaType = z.infer<typeof InvoiceFormSchema>;

const calculateItemTotal = (quantity: number, price: string): number => {
    return quantity * parseFloat(price);
};

const updateItemTotal = (
    index: number,
    control: Control<InvoiceFormSchemaType>,
    setValue: UseFormSetValue<InvoiceFormSchemaType>,
) => {
    const quantity = control._formValues.items[index].item_quantity;
    const price = control._formValues.items[index].item_price;
    const total = calculateItemTotal(quantity, price);
    setValue(`items.${index}.item_total`, total);
};

export function InvoiceForm() {
    const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

    const form = useForm<InvoiceFormSchemaType>({
        mode: "onSubmit",
        resolver: zodResolver(InvoiceFormSchema),
        defaultValues: {
            bill_from_street_address: "",
            bill_from_city: "",
            bill_from_postcode: "",
            bill_from_country: "",
            bill_to_email: "",
            bill_to_name: "",
            bill_to_street_address: "",
            bill_to_city: "",
            bill_to_postcode: "",
            bill_to_country: "",
            invoice_date: new Date(),
            payment_terms: "Net 30 Days",
            project_description: "",
            items: [
                {
                    item_description: "",
                    item_quantity: 1,
                    item_price: "0",
                    item_total: 0,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "items",
    });

    console.log("FORM ERRORS: ", form.formState.errors);

    useEffect(() => {
        const subscription = form.watch((_, { name }) => {
            if (
                name &&
                name.startsWith("items.") &&
                (name.endsWith("item_quantity") || name.endsWith("item_price"))
            ) {
                const index = parseInt(name.split(".")[1]);
                updateItemTotal(index, form.control, form.setValue);
            }
        });
        return () => subscription.unsubscribe();
    }, [form.watch]);

    const onSubmit = async (data: InvoiceFormSchemaType) => {
        try {
            // Here you would typically send the data to your backend
            console.log(data);
            // Simulate an API call
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsSubmitSuccessful(true);
        } catch (error) {
            console.error("Error submitting form:", error);
            setIsSubmitSuccessful(false);
        }
    };

    const handlePriceInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: { onChange: (value: string) => void },
    ) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            field.onChange(value);
        }
    };

    return (
        <Form {...form}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mb-8 sm:mb-0"
                >
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
                                        <Input
                                            {...field}
                                            error={Boolean(
                                                form.formState.errors
                                                    .bill_from_street_address,
                                            )}
                                        />
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
                                            <Input
                                                {...field}
                                                error={Boolean(
                                                    form.formState.errors
                                                        .bill_from_city,
                                                )}
                                            />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bill_from_postcode"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Post Code</FormLabel>
                                            <Input
                                                {...field}
                                                error={Boolean(
                                                    form.formState.errors
                                                        .bill_from_postcode,
                                                )}
                                            />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bill_from_country"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Country</FormLabel>
                                            <Input
                                                {...field}
                                                error={Boolean(
                                                    form.formState.errors
                                                        .bill_from_country,
                                                )}
                                            />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-primary font-semibold text-sm tracking-[-0.25px]">
                            Bill To
                        </h3>
                        <FormField
                            control={form.control}
                            name="bill_to_name"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Client's Name</FormLabel>
                                    <Input
                                        {...field}
                                        error={Boolean(
                                            form.formState.errors.bill_to_name,
                                        )}
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bill_to_email"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Client's Email</FormLabel>
                                    <Input
                                        {...field}
                                        error={Boolean(
                                            form.formState.errors.bill_to_email,
                                        )}
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="bill_to_street_address"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Street Address</FormLabel>
                                    <Input
                                        {...field}
                                        error={Boolean(
                                            form.formState.errors
                                                .bill_to_street_address,
                                        )}
                                    />
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
                                        <Input
                                            {...field}
                                            error={Boolean(
                                                form.formState.errors
                                                    .bill_to_city,
                                            )}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bill_to_postcode"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Post Code</FormLabel>
                                        <Input
                                            {...field}
                                            error={Boolean(
                                                form.formState.errors
                                                    .bill_to_postcode,
                                            )}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="bill_to_country"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Country</FormLabel>
                                        <Input
                                            {...field}
                                            error={Boolean(
                                                form.formState.errors
                                                    .bill_to_country,
                                            )}
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex flex-row gap-4 justify-center">
                            <DatePicker
                                control={form.control}
                                name="invoice_date"
                                label="Invoice Date"
                            />
                            <FormField
                                control={form.control}
                                name="payment_terms"
                                render={() => (
                                    <FormItem className="w-1/2 flex items-start flex-col text-left">
                                        <FormLabel className="mb-2">
                                            Payment Terms
                                        </FormLabel>
                                        <PaymentTermsDropdown
                                            control={form.control}
                                            name="payment_terms"
                                        />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="project_description"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Project Description</FormLabel>
                                    <Input
                                        {...field}
                                        error={Boolean(
                                            form.formState.errors
                                                .project_description,
                                        )}
                                    />
                                </FormItem>
                            )}
                        />
                        <h3 className="text-primary pt-4 font-semibold text-sm tracking-[-0.25px]">
                            Items
                        </h3>
                        {(fields ?? []).map((item, index) => (
                            <div key={item.id} className="space-y-4">
                                <div className="flex flex-row items-center gap-4">
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.item_description`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Item Name</FormLabel>
                                                <Input
                                                    {...field}
                                                    className="w-[180px]"
                                                    error={Boolean(
                                                        form.formState.errors
                                                            .items?.[index]
                                                            ?.item_description,
                                                    )}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.item_quantity`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Qty.</FormLabel>
                                                <Input
                                                    type="number"
                                                    className="flex items-center justify-center"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(
                                                            parseFloat(
                                                                e.target.value,
                                                            ),
                                                        );
                                                        updateItemTotal(
                                                            index,
                                                            form.control,
                                                            form.setValue,
                                                        );
                                                    }}
                                                    min="1"
                                                    error={Boolean(
                                                        form.formState.errors
                                                            .items?.[index]
                                                            ?.item_quantity,
                                                    )}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.item_price`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Price</FormLabel>
                                                <Input
                                                    type="text"
                                                    {...field}
                                                    onChange={(e) => {
                                                        handlePriceInput(
                                                            e,
                                                            field,
                                                        );
                                                        updateItemTotal(
                                                            index,
                                                            form.control,
                                                            form.setValue,
                                                        );
                                                    }}
                                                    error={Boolean(
                                                        form.formState.errors
                                                            .items?.[index]
                                                            ?.item_price,
                                                    )}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`items.${index}.item_total`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>
                                                    Item Total
                                                </FormLabel>
                                                <Input
                                                    {...field}
                                                    readOnly
                                                    value={field.value.toFixed(
                                                        2,
                                                    )}
                                                />
                                            </FormItem>
                                        )}
                                    />
                                    <Button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="bg-transparent hover:bg-transparent text-[#888EB0] p-0 mt-3 flex items-center justify-center"
                                    >
                                        <FaTrash />
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={() =>
                                append({
                                    item_description: "",
                                    item_quantity: 1,
                                    item_price: "0",
                                    item_total: 0,
                                })
                            }
                            className="bg-foreground w-full rounded-3xl text-body hover:text-white"
                        >
                            + Add New Item
                        </Button>
                        {form.formState.errors.items && (
                            <span className="text-destructive text-xs">
                                At least one item is required
                            </span>
                        )}
                    </div>

                    <div className="flex items-end justify-end">
                        {isSubmitSuccessful ? (
                            <SheetClose asChild>
                                <Button
                                    type="submit"
                                    className="bg-primary-foreground rounded-3xl text-white"
                                >
                                    Save changes
                                </Button>
                            </SheetClose>
                        ) : (
                            <Button
                                type="submit"
                                className="bg-primary-foreground rounded-3xl text-white"
                            >
                                Save changes
                            </Button>
                        )}
                    </div>
                </form>
            </Form>
        </Form>
    );
}
