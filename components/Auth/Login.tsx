import React from "react";
import { Button } from "@/components/ui/button";
import { FaWrench } from "react-icons/fa";

export default function LoginForm({
  loginWithDemoAccount,
}: {
  loginWithDemoAccount: () => void;
}) {
  return (
    <div className="max-w-full md:w-[480px] space-y-10 py-10 bg-foreground p-8 rounded-lg shadow-lg">
      <div className="space-y-2 text-center">
        <div className="flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="38"
            viewBox="0 0 40 38"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.6942 0.291992L20 18.9998L29.3058 0.291992C35.6645 3.64055 40 10.3139 40 17.9998C40 29.0454 31.0457 37.9998 20 37.9998C8.9543 37.9998 0 29.0454 0 17.9998C0 10.3139 4.33546 3.64055 10.6942 0.291992Z"
              fill="#7C5DFA"
            />
          </svg>
          <h1 className="text-3xl font-bold text-heading">Invoicez</h1>
        </div>

        <h2 className="text-body text-lg leading-tight">
          Try out Invoicez with a demo account.
        </h2>
      </div>
      <div className="space-y-4 text-heading dark:text-secondaryBody">
        <Button
          variant="outline"
          className="w-full py-8 bg-foreground dark:bg-white dark:text-black dark:hover:text-black rounded-roundedBtn"
          onClick={loginWithDemoAccount}
        >
          <FaWrench className="h-5 w-5 mr-2" />
          <span className="pt-[3px] text-lg">Demo Login</span>
        </Button>
      </div>
    </div>
  );
}
