import { ConversationGetOne } from "../../types";
import { ConversationForm } from "./conversation-form";
import { ResponsiveDialogProps } from "@/components/responsive-dialog";

interface UpdateConversationDilaogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: ConversationGetOne;
}

export const UpdateConversationDilaog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateConversationDilaogProps) => {

  return (
    <ResponsiveDialogProps
      title="Update Conversation"
      description="Update the conversation details"
      isOpen={open}
      onOpenChange={onOpenChange}
    >
      <ConversationForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialogProps>
  );
};