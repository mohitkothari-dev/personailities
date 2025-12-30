import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import type { SearchParams } from "nuqs/server";
import { ErrorBoundary } from "react-error-boundary";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { auth } from "@/lib/auth";

import { getQueryClient, trpc } from "@/trpc/server";
//import { loadSearchParams } from "@/modules/meetings/params";
import { ConversationsView, ConversationsViewLoading, ConversationsViewError } from "@/modules/conversations/ui/views/conversations-view";
import ConversationsListHeader from "@/modules/conversations/ui/components/conversations-list-header";

interface Props {
  searchParams: Promise<SearchParams>;
}

const Page = async ({ searchParams }: Props) => {
  // const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/sign-in");

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.conversations.getMany.queryOptions({ })
  );

  return (
    <>
    <ConversationsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<ConversationsViewLoading />}>
          <ErrorBoundary fallback={<ConversationsViewError />}>
            <ConversationsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;