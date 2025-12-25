import { ResponsiveDialogProps } from "@/components/responsive-dialog";

import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
    open: boolean;
    onOpenChange: (isOpen: boolean) => void;
}

export const NewAgentDialog = ({ open, onOpenChange }: NewAgentDialogProps) => {
    return (
        <ResponsiveDialogProps
            isOpen={open}
            onOpenChange={onOpenChange}
            title="New PersonAIlity"
            description="Create a new Persona"
        >
            <AgentForm onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} />
        </ResponsiveDialogProps>
    )
}
