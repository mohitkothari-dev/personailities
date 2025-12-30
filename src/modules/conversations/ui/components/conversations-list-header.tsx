"use client";

import { Button } from "@/components/ui/button"
import { PlusIcon, XCircleIcon } from "lucide-react";
import { useState } from "react";
import { NewConversationDialog } from "./new-conversation-dialog";
import { ConversationsSearchFilter } from "./conversations-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentIdFilter } from "./agent-id-filter";
import { useConversationsFilters } from "../../hooks/use-conversations-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";

const ConversationsListHeader = () => { 
  const [filters, setFilters] = useConversationsFilters();
  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false);
  
  const isANyFilterModified = !!filters.agentId || !!filters.status || !!filters.search;

  const onClearFilters = () => {
    setFilters({
      agentId: "",
      status: null,
      search: "",
      page: DEFAULT_PAGE,
    })
  }

  return (
    <>
    <NewConversationDialog 
      open={isNewConversationDialogOpen}
      onOpenChange={setIsNewConversationDialogOpen}
    />
    <div className="py-4 px4 md:px-8 flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h5 className="font-medium text-xl">My Conversations</h5>
        <Button onClick={() => {setIsNewConversationDialogOpen(true)}}><PlusIcon />New Conversation</Button>
      </div>
      <ScrollArea>
      <div className="flex items-center gap-x-2 p-1" >
        <ConversationsSearchFilter /> 
        <StatusFilter />
        <AgentIdFilter />
        {
          isANyFilterModified && (
            <Button variant="outline" onClick={onClearFilters}><XCircleIcon className="size-4" />Clear</Button>
          )
        }
      </div>
      <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
    </>
  )
}

export default ConversationsListHeader
