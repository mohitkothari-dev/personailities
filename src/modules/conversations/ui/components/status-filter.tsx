import {
  CircleXIcon,
  CircleCheckIcon,
  ClockArrowUpIcon,
  VideoIcon,
  LoaderIcon,
} from "lucide-react";

import { ConversationStatus } from "../../types";
import { CommandSelect } from "@/components/command-select";
import { useConversationsFilters } from "../../hooks/use-conversations-filters";

const options = [
  {
    id: ConversationStatus.UPCOMING,
    value: ConversationStatus.UPCOMING,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon /> {ConversationStatus.UPCOMING}
      </div>
    ),
  },
  {
    id: ConversationStatus.COMPLETED,
    value: ConversationStatus.COMPLETED,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheckIcon /> {ConversationStatus.COMPLETED}
      </div>
    ),
  },
  {
    id: ConversationStatus.ACTIVE,
    value: ConversationStatus.ACTIVE,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon /> {ConversationStatus.ACTIVE}
      </div>
    ),
  },
  {
    id: ConversationStatus.PROCESSING,
    value: ConversationStatus.PROCESSING,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon /> {ConversationStatus.PROCESSING}  
      </div>
    ),
  },
  {
    id: ConversationStatus.CANCELLED,
    value: ConversationStatus.CANCELLED,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon /> {ConversationStatus.CANCELLED}
      </div>
    ),
  },
];

export const StatusFilter = () => {
  const [filters, setFilters] = useConversationsFilters();
  return (
    <CommandSelect
      options={options}
      value={filters.status ?? ""}
      onSelect={(value) => {
        setFilters({ status: value as ConversationStatus });
      }}
      placeholder="Filter by status"
      className="h-9"
    />
  );
};