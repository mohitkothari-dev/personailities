import { AlertCircleIcon } from "lucide-react";

interface Props {
    title: string;
    description: string;
}

export const ErrorState = ({title, description}: Props) => {
    return (
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                <AlertCircleIcon className="w-12 h-12 text-destructive" />
                <div className="text-lg font-medium text-foreground">{title}</div>
                <div className="text-sm text-muted-foreground">{description}</div>
            </div>
        </div>
    )
}