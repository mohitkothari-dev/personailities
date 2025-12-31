import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ErrorBoundary } from "react-error-boundary";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  ConversationIdView,
  ConversationIdViewError,
  ConversationIdViewLoading,
} from "@/modules/conversations/ui/views/conversation-id-view";

interface Props {
  params: Promise<{
    conversationId: string;
  }>;
}

const ConversationIdPage = async ({ params }: Props) => {
  const { conversationId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.conversations.getOne.queryOptions({ id: conversationId })
  );

  // Todo: prefetch transcriptions related to this conversation

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<ConversationIdViewLoading />}>
        <ErrorBoundary fallback={<ConversationIdViewError />}>
          <ConversationIdView conversationId={conversationId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default ConversationIdPage;
