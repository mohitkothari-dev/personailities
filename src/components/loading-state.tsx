import { Loader2 } from "lucide-react";

interface Props {
    title: string;
    description: string;
}

export const LoadingState = ({title, description}: Props) => {
    return (
        <div className="py-4 px-8 flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="text-lg font-medium text-foreground">{title}</div>
                <div className="text-sm text-muted-foreground">{description}</div>
            </div>
        </div>
    )
}