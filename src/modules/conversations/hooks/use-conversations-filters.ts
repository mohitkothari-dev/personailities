import { DEFAULT_PAGE } from "@/constants";
import { parseAsInteger, parseAsString, useQueryStates, parseAsStringEnum } from "nuqs";
import { ConversationStatus } from "@/modules/conversations/types";



export const useConversationsFilters = () => {
    return useQueryStates({
        page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
        search: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),  //not allowing user to change page size from the url
        status: parseAsStringEnum(Object.values(ConversationStatus)),
        agentId: parseAsString.withDefault('').withOptions({ clearOnDefault: true }),
    })
}