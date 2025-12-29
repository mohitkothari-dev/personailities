import { ResponsiveDialogProps } from "@/components/responsive-dialog";
import { AgentGetOne } from "../../types";
import { AgentForm } from "./agent-form";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: AgentGetOne;
}

const UpdateAgentDialog: React.FC<UpdateAgentDialogProps> = ({ open, onOpenChange, initialValues }) => {
  return (
    <ResponsiveDialogProps
      title="Edit Agent"
      description="Edit the details of your agent"
      isOpen={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        initialValues={initialValues}
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialogProps>
  );
};

export default UpdateAgentDialog;