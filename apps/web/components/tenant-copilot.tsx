"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Loader2, MessageSquare, Send, Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AssistantResponse } from "@/lib/db/zod/assistant";

type TenantCopilotProps = {
  tenantSlug: string;
  tenantName: string;
};

type ChatMessage =
  | { id: string; role: "user"; content: string }
  | { id: string; role: "assistant"; payload: AssistantResponse };

const samplePrompts = [
  "Which SKUs are below reorder threshold?",
  "What approvals are pending today?",
  "Which shipments are delayed?",
  "What exceptions need attention right now?",
];

const assistantPersona = {
  name: "FlowGuide",
  title: "EasyFlow assistant",
  intro: "Here to help with orders, stock, shipments, approvals, and follow-up.",
};

const introStorageKey = "easyflow.flowguide.intro-seen";

export function TenantCopilot({ tenantSlug, tenantName }: TenantCopilotProps) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [threadId, setThreadId] = useState<string | undefined>();
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const canSend = question.trim().length >= 3 && !loading;
  const welcomeText = useMemo(
    () => `Hi, I’m ${assistantPersona.name}. I can help with ${tenantName}'s day-to-day operations.`,
    [tenantName]
  );

  useEffect(() => {
    const hasSeenIntro = window.localStorage.getItem(introStorageKey) === "1";
    setShowTooltip(!hasSeenIntro);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  function markIntroSeen() {
    window.localStorage.setItem(introStorageKey, "1");
    setShowTooltip(false);
  }

  function openAssistant() {
    markIntroSeen();
    setOpen(true);
  }

  function closeAssistant() {
    setOpen(false);
  }

  async function submitQuestion(nextQuestion?: string) {
    const value = (nextQuestion ?? question).trim();
    if (value.length < 3 || loading) return;

    setLoading(true);
    setError(null);
    setMessages((current) => [...current, { id: `user-${Date.now()}`, role: "user", content: value }]);
    setQuestion("");

    try {
      const response = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenantSlug,
          threadId,
          question: value,
        }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Assistant request failed.");
      }

      const assistantPayload = payload as AssistantResponse;
      setThreadId(assistantPayload.threadId);
      setMessages((current) => [...current, { id: `assistant-${Date.now()}`, role: "assistant", payload: assistantPayload }]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Assistant request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && showTooltip && (
        <div className="fixed bottom-24 right-6 z-40 w-[min(340px,calc(100vw-2rem))] rounded-[24px] border border-[hsl(184,73%,61%)]/18 bg-[hsl(214,55%,6%)]/96 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.48)] backdrop-blur-2xl">
          <div className="flex items-start gap-3">
            <AssistantAvatar />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-white">{assistantPersona.name}</div>
                  <div className="text-[0.7rem] uppercase tracking-[0.24em] text-[hsl(184,73%,61%)]/80">
                    {assistantPersona.title}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={markIntroSeen}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/35 transition hover:text-white"
                  aria-label="Dismiss assistant introduction"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <p className="mt-3 text-sm leading-6 text-white/60">
                I’m here whenever you want a quick answer or a faster way to work through operations.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={openAssistant}
                  className="inline-flex items-center gap-2 rounded-full bg-[hsl(184,73%,61%)] px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-105"
                >
                  Open {assistantPersona.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={openAssistant}
          className={cn(
            "group inline-flex items-center gap-3 rounded-full border border-[hsl(184,73%,61%)]/20 bg-[hsl(214,55%,6%)]/96 px-3 py-3 text-left shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition hover:brightness-105",
            showTooltip && !open && "animate-[pulse_3.6s_ease-in-out_infinite]"
          )}
          aria-label={`Open ${assistantPersona.name}`}
        >
          <AssistantAvatar />
          <div className="hidden pr-2 sm:block">
            <div className="text-sm font-semibold text-white">{assistantPersona.name}</div>
            <div className="text-[0.72rem] text-white/45">{assistantPersona.title}</div>
          </div>
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-[2px]">
          <button
            type="button"
            className="absolute inset-0"
            onClick={closeAssistant}
            aria-label="Close assistant overlay"
          />

          <aside className="absolute bottom-24 right-6 flex h-[min(76vh,760px)] w-[min(430px,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-[30px] border border-white/10 bg-[hsl(214,55%,5%)]/98 shadow-[0_30px_100px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
            <div className="border-b border-white/8 px-5 py-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <AssistantAvatar />
                  <div>
                    <div className="text-base font-semibold text-white">{assistantPersona.name}</div>
                    <div className="text-[0.72rem] uppercase tracking-[0.24em] text-[hsl(184,73%,61%)]">
                      {assistantPersona.title}
                    </div>
                    <div className="mt-1 text-sm text-white/50">{welcomeText}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeAssistant}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/45 transition hover:bg-white/8 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.03] p-5 text-sm leading-6 text-white/50">
                    {assistantPersona.intro}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {samplePrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => void submitQuestion(prompt)}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[0.78rem] text-white/60 transition hover:border-white/20 hover:bg-white/8 hover:text-white"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    message.role === "user" ? (
                      <div
                        key={message.id}
                        className="ml-auto max-w-[88%] rounded-[22px] border border-[hsl(184,73%,61%)]/20 bg-[hsl(184,73%,61%)]/10 px-4 py-3 text-sm leading-6 text-[hsl(184,73%,61%)]"
                      >
                        {message.content}
                      </div>
                    ) : (
                      <AssistantBubble
                        key={message.id}
                        payload={message.payload}
                        onPromptClick={(prompt) => void submitQuestion(prompt)}
                      />
                    )
                  ))}
                </div>
              )}

              {loading && (
                <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Grounding answer from tenant data…
                </div>
              )}

              {error && (
                <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-white/8 px-5 py-4">
              <div className="flex gap-3">
                <textarea
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      void submitQuestion();
                    }
                  }}
                  rows={3}
                  placeholder={`Ask ${assistantPersona.name} about ${tenantName}...`}
                  className="min-h-[88px] flex-1 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-[hsl(184,73%,61%)]/35"
                />
                <button
                  type="button"
                  disabled={!canSend}
                  onClick={() => void submitQuestion()}
                  className={cn(
                    "inline-flex h-12 w-12 shrink-0 items-center justify-center self-end rounded-2xl transition",
                    canSend
                      ? "bg-[hsl(184,73%,61%)] text-slate-950 hover:brightness-105"
                      : "bg-white/6 text-white/25"
                  )}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

function AssistantAvatar() {
  return (
    <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[hsl(184,73%,61%)]/25 bg-[hsl(184,73%,61%)]/10 text-[hsl(184,73%,61%)] shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
      <Bot className="h-5 w-5" />
      <span className="absolute -right-0.5 -top-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-[hsl(82,78%,71%)] text-[9px] font-bold text-slate-950">
        ✦
      </span>
    </div>
  );
}

function AssistantBubble({
  payload,
  onPromptClick,
}: {
  payload: AssistantResponse;
  onPromptClick: (prompt: string) => void;
}) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4">
      <div className="mb-3 flex items-center gap-3">
        <AssistantAvatar />
        <div>
          <div className="text-sm font-semibold text-white">{assistantPersona.name}</div>
          <div className="text-[0.68rem] uppercase tracking-[0.24em] text-[hsl(184,73%,61%)]">
            {payload.provider}
          </div>
        </div>
      </div>
      <p className="text-sm leading-6 text-white/75">{payload.answer}</p>

      {payload.summary.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/30">Summary</div>
          <ul className="space-y-2 text-sm text-white/55">
            {payload.summary.map((item) => (
              <li key={item} className="rounded-xl bg-white/[0.03] px-3 py-2">{item}</li>
            ))}
          </ul>
        </div>
      )}

      {payload.alerts.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/30">Alerts</div>
          <div className="space-y-2">
            {payload.alerts.map((alert) => (
              <div key={`${alert.label}-${alert.detail}`} className="rounded-xl border border-white/8 bg-[hsl(214,55%,4%)] px-3 py-2 text-sm">
                <div className="font-medium text-white/75">{alert.label}</div>
                <div className="text-white/45">{alert.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {payload.citations.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/30">Sources</div>
          <div className="space-y-2">
            {payload.citations.map((citation) => (
              <div key={`${citation.sourceType}-${citation.sourceId}`} className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm">
                <div className="text-white/75">{citation.title}</div>
                <div className="mt-1 text-xs text-white/45">{citation.excerpt}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {payload.followUps.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/30">Try next</div>
          <div className="flex flex-wrap gap-2">
            {payload.followUps.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onPromptClick(item)}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.72rem] text-white/55 transition hover:border-white/20 hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
