"use client";

import InvoiceDisplay from "@/components/InvoiceDisplay/InvoiceDisplay";
import useInvoices from "@/hooks/invoices/useInvoices";
import useFilteredInvoices from "../hooks/invoices/useFilteredInvoices";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function InvoicesPage() {
  const router = useRouter();
  const { loading, invoicesLoaded, fetchInvoices } = useInvoices();
  const { filteredInvoices } = useFilteredInvoices();

  const checkTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/demo");
      return false;
    }

    try {
      const decodedToken = jwtDecode<{ exp: number }>(token);
      if (!decodedToken.exp || decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        router.push("/auth/demo");
        return false;
      }
      return true;
    } catch (error) {
      localStorage.removeItem("token");
      router.push("/auth/demo");
      return false;
    }
  };

  useEffect(() => {
    if (checkTokenExpiration()) {
      fetchInvoices();
    }
  }, [router, fetchInvoices]);

  return (
    <div className="flex min-h-screen w-full items-start justify-center pt-[120px] md:pl-[103px] md:pt-[77px]">
      <main className="flex flex-col h-full w-full md:w-[768px] items-center justify-center mx-4">
        <InvoiceDisplay
          filteredInvoices={filteredInvoices}
          invoicesLoaded={invoicesLoaded}
          loading={loading}
        />
      </main>
    </div>
  );
}
