import { z } from 'zod';
import { and, desc, eq, getTableColumns, ilike, count } from 'drizzle-orm';
import { db } from "@/db";
import { conversations } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from '@/constants';
import { TRPCError } from '@trpc/server';
import { conversationsInsertSchema, conversationsUpdateSchema } from '../schemas';

export const conversationsRouter = createTRPCRouter({

    update: protectedProcedure.input(conversationsUpdateSchema).mutation(async ({ input, ctx }) => {
        const [updatedConversation] = await db
          .update(conversations)
          .set(input)
          .where(and(eq(conversations.id, input.id), eq(conversations.userId, ctx.auth.user.id)))
          .returning();
        if (!updatedConversation) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Conversation not found" });
        }
        return updatedConversation;
        }),

    create: protectedProcedure.input(conversationsInsertSchema).mutation(async ({ ctx, input }) => {
            const [createdConversation] = await db.insert(conversations).values({
                ...input,
                userId: ctx.auth.user.id,
            }).returning();
    
            return createdConversation;
        }),

    getOne: protectedProcedure.input(z.object({id: z.string()})).query(async ({ input, ctx }) => {
        const [existingConversation] = await db.select({
            ...getTableColumns(conversations),
        }).from(conversations).where(
            and(
                eq(conversations.id, input.id),
                eq(conversations.userId, ctx.auth.user.id)  // TO ensure that the conversations user id is the same one as context
            )
        );

        if (!existingConversation) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Conversation not found',
            });
        }

        return existingConversation;
    }),

    getMany: protectedProcedure
    .input(z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
    }))
    .query(async ({ ctx, input }) => {
        const { page, pageSize, search } = input;

        const data = await db.select({
            ...getTableColumns(conversations),
        }).from(conversations)
        .where(and(
            eq(conversations.userId, ctx.auth.user.id),
            search ? ilike(conversations.name, `%${search}%`) : undefined,        //only load conversations that this user created
        )).orderBy(desc(conversations.createdAt), desc(conversations.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

        const total = await db.select({ count: count() })   
        .from(conversations)
        .where(and(
            eq(conversations.userId, ctx.auth.user.id),
            search ? ilike(conversations.name, `%${search}%`) : undefined,        //only load conversations that this user created
        ));

        const totalPages = Math.ceil(total[0].count / pageSize);

        return {
            items: data,
            total: total[0].count,
            totalPages,
        }

    }),
})