import { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";

export type ConversationGetMany =
  inferRouterOutputs<AppRouter>["conversations"]["getMany"]["items"];
export type ConversationGetOne = inferRouterOutputs<AppRouter>["conversations"]["getOne"];

export enum ConversationStatus {
  UPCOMING = "upcoming",
  ACTIVE = "active",
  COMPLETED = "completed",
  PROCESSING = "processing",
  CANCELLED = "cancelled",
}

export type ConversationTranscriptionItem = {
  speaker_id: string;
  type: string;
  text: string;
  start_ts: string;
  stop_ts: string;
};