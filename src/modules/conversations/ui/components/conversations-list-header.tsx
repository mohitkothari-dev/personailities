"use client";

import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { NewConversationDialog } from "./new-conversation-dialog";

const ConversationsListHeader = () => { 

  const [isNewConversationDialogOpen, setIsNewConversationDialogOpen] = useState(false);
  
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
      <div className="flex items-center gap-x-2 p-1" >
        
      </div>
    </div>
    </>
  )
}

export default ConversationsListHeader
