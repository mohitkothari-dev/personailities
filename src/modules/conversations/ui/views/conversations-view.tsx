"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const ConversationsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.conversations.getMany.queryOptions({}));

  return (
    <div>
        {JSON.stringify(data)}
    </div>
  )
}

export const ConversationsViewLoading = () => {
  return (
    <LoadingState title="Loading Conversations" description="This may take a few seconds" />
  );
};

export const ConversationsViewError = () => {
  return (
    <ErrorState
      title="Error loading conversations"
      description="Something went wrong while loading the conversations"
    />
  );
};