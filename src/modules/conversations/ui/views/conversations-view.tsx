"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { useRouter } from "next/navigation";
import { useConversationsFilters } from "../../hooks/use-conversations-filters";
import { DataPagination } from "@/components/data-pagination";



export const ConversationsView = () => {
    const trpc = useTRPC();
    const router = useRouter();
    const [filters, setFilters] = useConversationsFilters();
    const { data } = useSuspenseQuery(trpc.conversations.getMany.queryOptions({
      ...filters,

    }));

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} onRowClick={(row) => router.push(`/conversations/${row.id}`)} />
      <DataPagination
      page={filters.page}
      totalPages={data.totalPages}
      onPageChange={(page) => setFilters({ page })}
      />
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