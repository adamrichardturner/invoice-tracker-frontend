import React from "react";
import { useController, Control } from "react-hook-form";
import { InvoiceFormSchemaType } from "../../InvoiceForm";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountryRegionData } from "react-country-region-selector";

interface CountrySelectorProps {
    control: Control<InvoiceFormSchemaType>;
    name: "bill_from_country" | "bill_to_country";
}

export function CountrySelector({ control, name }: CountrySelectorProps) {
    const { field } = useController({
        name,
        control,
    });

    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const handleCountryChange = (value: string) => {
        field.onChange(value);
        setOpen(false);
    };

    const filteredCountries = CountryRegionData.filter((country) =>
        country[0].toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {field.value || "Select country..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput
                        placeholder="Search country..."
                        value={searchQuery}
                        onValueChange={(value) => setSearchQuery(value)}
                    />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-72">
                            {filteredCountries.map(([country]) => (
                                <CommandItem
                                    key={country}
                                    onSelect={() =>
                                        handleCountryChange(country)
                                    }
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === country
                                                ? "opacity-100"
                                                : "opacity-0",
                                        )}
                                    />
                                    {country}
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
