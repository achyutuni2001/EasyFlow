import { z } from "zod";

const jsonValueSchema: z.ZodType<unknown> = z.lazy(() =>
  z.union([z.string(), z.number(), z.boolean(), z.null(), z.array(jsonValueSchema), z.record(z.string(), jsonValueSchema)])
);

export const assistantThreadSchema = z.object({
  id: z.string().max(64),
  tenantId: z.string().max(64),
  createdByUserId: z.string().max(64).nullable().optional(),
  title: z.string().max(160),
  status: z.string().max(32),
  source: z.string().max(64),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const assistantMessageSchema = z.object({
  id: z.string().max(64),
  threadId: z.string().max(64),
  tenantId: z.string().max(64),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  citations: jsonValueSchema.optional().nullable(),
  metadata: jsonValueSchema.optional().nullable(),
  createdAt: z.date(),
});

export const assistantDocumentSchema = z.object({
  id: z.string().max(64),
  tenantId: z.string().max(64),
  sourceType: z.string().max(64),
  sourceId: z.string().max(128).nullable().optional(),
  title: z.string().max(160),
  content: z.string(),
  searchText: z.string(),
  keywords: jsonValueSchema.optional().nullable(),
  metadata: jsonValueSchema.optional().nullable(),
  embeddingModel: z.string().max(128).nullable().optional(),
  embeddingRef: z.string().max(256).nullable().optional(),
  fingerprint: z.string().max(160),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const assistantCitationSchema = z.object({
  sourceType: z.string(),
  sourceId: z.string(),
  title: z.string(),
  excerpt: z.string(),
  score: z.number().nonnegative(),
});

export const assistantAlertSchema = z.object({
  severity: z.enum(["low", "medium", "high", "critical"]),
  label: z.string(),
  detail: z.string(),
});

export const assistantResponseSchema = z.object({
  threadId: z.string(),
  provider: z.string(),
  answer: z.string(),
  summary: z.array(z.string()),
  followUps: z.array(z.string()),
  alerts: z.array(assistantAlertSchema),
  citations: z.array(assistantCitationSchema),
  groundedAt: z.string(),
});

export const assistantRequestSchema = z.object({
  tenantSlug: z.string().min(1).max(128),
  question: z.string().min(3).max(2000),
  threadId: z.string().max(64).optional(),
});

export type AssistantThreadRecord = z.infer<typeof assistantThreadSchema>;
export type AssistantMessageRecord = z.infer<typeof assistantMessageSchema>;
export type AssistantDocumentRecord = z.infer<typeof assistantDocumentSchema>;
export type AssistantCitationRecord = z.infer<typeof assistantCitationSchema>;
export type AssistantAlertRecord = z.infer<typeof assistantAlertSchema>;
export type AssistantRequest = z.infer<typeof assistantRequestSchema>;
export type AssistantResponse = z.infer<typeof assistantResponseSchema>;
