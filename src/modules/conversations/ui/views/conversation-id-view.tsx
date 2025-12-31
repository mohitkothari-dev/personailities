"use client";

import { toast } from "sonner";
import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import {
  useSuspenseQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useConfirm } from "@/modules/agents/hooks/use-confirm";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";
//import { CompletedState } from "../components/completed-state";
import { ConversationIdViewHeader } from "../components/conversation-id-view-header";
import { UpdateConversationDilaog } from "../components/update-conversation-dialog";

interface Props {
  conversationId: string;
}

export const ConversationIdView = ({ conversationId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [updateConversationDialogOpen, setUpdateConversationDialogOpen] = useState(false);

  const { data } = useSuspenseQuery(
    trpc.conversations.getOne.queryOptions({ id: conversationId })
  );

  const removeConversation = useMutation(
    trpc.conversations.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.conversations.getMany.queryOptions({})
        );
        // await queryClient.invalidateQueries(
        //   trpc.premium.getFreeUsage.queryOptions()
        // );
        router.push("/conversations");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    "Are you sure?",
    `The following action will remove this conversation.`
  );

  const handleRemoveConversation = async () => {
    const ok = await confirmRemove();

    if (!ok) return;

    await removeConversation.mutateAsync({ id: conversationId });
  };

  const isActive = data.status === "active";
  const isUpcoming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  return (
    <>
      <RemoveConfirmation />
      <UpdateConversationDilaog
        open={updateConversationDialogOpen}
        onOpenChange={setUpdateConversationDialogOpen}
        initialValues={data}
      />
      <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <ConversationIdViewHeader
          conversationId={conversationId}
          conversationName={data.name}
          onEdit={() => setUpdateConversationDialogOpen(true)}
          onRemove={handleRemoveConversation}
        />
        {isActive && <ActiveState conversationId={conversationId} />}
        {isUpcoming && (
          <UpcomingState
            conversationId={conversationId}
            isCanceling={false}
          />
        )}
        {isCancelled && <CancelledState />}
        {isProcessing && <ProcessingState />}
        {isCompleted && <div>Completed</div>}
      </div>
    </>
  );
};

export const ConversationIdViewLoading = () => (
  <LoadingState
    title="Loading Conversation"
    description="This may take a few seconds"
  />
);

export const ConversationIdViewError = () => (
  <ErrorState
    title="Error Loading Conversation"
    description="Something went wrong"
  />
);