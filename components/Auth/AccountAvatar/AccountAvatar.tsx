import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AccountAvatar() {
    return (
        <Avatar>
            <AvatarImage
                src="https://github.com/shadcn.png"
                alt="@shadcn"
                className="w-10 h-10"
            />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    );
}
