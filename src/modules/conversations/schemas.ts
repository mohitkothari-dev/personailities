import { z } from 'zod';

export const conversationsInsertSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    agentId: z.string().min(1, 'Agent is required'),
}) 

export const conversationsUpdateSchema = conversationsInsertSchema.extend({
    id: z.string().min(1, {message: 'ID is required'}),
})
