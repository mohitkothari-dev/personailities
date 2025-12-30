import { useRouter } from "next/navigation";
import { ResponsiveDialogProps } from "@/components/responsive-dialog";

import { ConversationForm } from "./conversation-form";

interface NewConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewConversationDialog = ({
  open,
  onOpenChange,
}: NewConversationDialogProps) => {
  const router = useRouter();

  return (
    <ResponsiveDialogProps
      title="New Conversation"
      description="Create a new conversation"
      isOpen={open}
      onOpenChange={onOpenChange}
    >
        <ConversationForm 
        onSuccess={(id) => { 
            onOpenChange(false); 
            router.push(`/conversations/${id}`); 
            }}  
            onCancel={() => onOpenChange(false)}
            />
    </ResponsiveDialogProps>
  );
};