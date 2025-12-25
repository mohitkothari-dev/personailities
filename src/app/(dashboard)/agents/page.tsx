import { AgentsView } from "@/modules/agents/ui/views/agents-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { LoadingState } from "@/components/loading-state";
import AgentsListHeader from "@/modules/agents/ui/components/agents-list-header";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";


const page = async () => {
  const session = await auth.api.getSession({
      headers: await headers(),
    })
  
    if (!session) {
      redirect("/sign-in")
    }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery( trpc.agents.getMany.queryOptions() );
  return (
    <>
    <AgentsListHeader />
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<LoadingState title="Loading agents" description="Please wait, this may take a while" />}>
        <AgentsView />
      </Suspense>
    </HydrationBoundary>
    </>
  )
}

export default page