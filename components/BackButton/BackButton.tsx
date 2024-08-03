"use client";

import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";

interface BackButtonProps {
    path?: string;
}

export default function BackButton({ path }: BackButtonProps) {
    const router = useRouter();
    const onClickBack = () => {
        if (!path) {
            return router.back();
        }
        router.push(path);
    };
    return (
        <div
            onClick={onClickBack}
            className="flex space-x-4 w-full items-center pb-8 cursor-pointer"
        >
            <MdKeyboardArrowLeft className="text-primary" />
            <span className="text-[#0C0E16] dark:text-white text-sm font-semibold">
                Go back
            </span>
        </div>
    );
}
