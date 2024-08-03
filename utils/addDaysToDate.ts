import { PaymentTerms } from "@/types/Invoice";

export function addDaysToDateFromTerm(
  date: Date | string,
  term: PaymentTerms,
): string {
  let validDate: Date;

  if (typeof date === "string") {
    validDate = new Date(date);
  } else {
    validDate = date;
  }

  if (isNaN(validDate.getTime())) {
    throw new Error("Invalid date");
  }

  const newDate = new Date(validDate);
  newDate.setDate(validDate.getDate() + computeTerms(term));

  return newDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function computeTerms(term: PaymentTerms): number {
  switch (term) {
    case "Net 30 Days":
      return 30;
    case "14 Days":
      return 14;
    case "7 Days":
      return 7;
    default:
      throw new Error("Invalid payment term");
  }
}
