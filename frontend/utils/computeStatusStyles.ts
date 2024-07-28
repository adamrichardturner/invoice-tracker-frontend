export function computeStatusStyles(status: string) {
    const statusClasses: {
        [key: string]: {
            background: string;
            textColor: string;
            darkModeTextColor: string;
            iconColor: string;
            darkModeIconColor: string;
        };
    } = {
        paid: {
            background: "bg-green-500",
            textColor: "text-green-500",
            darkModeTextColor: "dark:text-green-400",
            iconColor: "bg-green-500",
            darkModeIconColor: "dark:bg-green-400",
        },
        pending: {
            background: "bg-orange-500",
            textColor: "text-orange-500",
            darkModeTextColor: "dark:text-orange-400",
            iconColor: "bg-orange-500",
            darkModeIconColor: "dark:bg-orange-400",
        },
        draft: {
            background: "bg-gray-500",
            textColor: "text-gray-500",
            darkModeTextColor: "dark:text-gray-200",
            iconColor: "bg-gray-500",
            darkModeIconColor: "dark:bg-gray-200",
        },
    };

    return (
        statusClasses[status] || {
            background: "bg-gray-500",
            textColor: "text-gray-600",
            darkModeTextColor: "dark:text-gray-700",
            iconColor: "bg-gray-600",
            darkModeIconColor: "dark:bg-gray-700",
        }
    );
}
