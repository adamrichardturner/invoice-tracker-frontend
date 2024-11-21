"use client";

import Image from "next/image";
import WhiteSpinner from "@/assets/ui/Spinner-White.svg";
import PurpleSpinner from "@/assets/ui/Spinner-Purple.svg";

const LoaderAnimation = ({ size, theme }: { size: number; theme: string }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <Image
        src={theme === "light" ? PurpleSpinner : WhiteSpinner}
        alt="loader"
        width={size}
        height={size}
      />
    </div>
  );
};

export default LoaderAnimation;
