import {agentsRouter} from '@/modules/agents/server/procedures';
import {conversationsRouter} from '@/modules/conversations/server/procedures';



import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
  agents: agentsRouter, 
  conversations: conversationsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;