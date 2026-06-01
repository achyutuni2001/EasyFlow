"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AppShell } from "../../../components/app-shell";
import { NodeDetail } from "../../../components/node-detail";
import { STORAGE_KEY, initialProcesses } from "../../../components/process-builder";
import type { TenantProcess, ProcessNode } from "../../../components/process-builder";

function getAllProcesses(): TenantProcess[] {
  if (typeof window === "undefined") return initialProcesses;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialProcesses;
    const parsed = JSON.parse(raw) as TenantProcess[];
    if (!Array.isArray(parsed) || parsed.length === 0) return initialProcesses;
    return parsed;
  } catch {
    return initialProcesses;
  }
}

export default function NodeDetailPage() {
  const params = useParams();
  const nodeId = Array.isArray(params.nodeId) ? params.nodeId[0] : params.nodeId;

  const [processes, setProcesses] = useState<TenantProcess[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProcesses(getAllProcesses());
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AppShell title="Node Detail" subtitle="Loading…">
        <div className="flex h-64 items-center justify-center text-muted-foreground text-sm">
          Loading…
        </div>
      </AppShell>
    );
  }

  // Find the node across all tenants
  let foundNode: ProcessNode | null = null;
  let foundProcess: TenantProcess | null = null;

  for (const process of processes) {
    const node = process.nodes.find((n) => n.id === nodeId);
    if (node) {
      foundNode = node;
      foundProcess = process;
      break;
    }
  }

  if (!foundNode || !foundProcess) {
    return (
      <AppShell title="Node Detail" subtitle="Node not found">
        <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
          <div className="text-sm text-muted-foreground">
            Node <code className="rounded bg-white/5 px-2 py-0.5">{nodeId}</code> was not found.
          </div>
          <a href="/workflows" className="text-sm text-secondary hover:underline">← Back to Canvas</a>
        </div>
      </AppShell>
    );
  }

  const allNodes = processes.flatMap((p) => p.nodes);
  const allEdges = processes.flatMap((p) => p.edges);

  return (
    <AppShell
      title={foundNode.label}
      subtitle={`${foundProcess.tenantName} · ${foundProcess.processName}`}
    >
      <NodeDetail
        node={foundNode}
        process={foundProcess}
        allEdges={allEdges}
        allNodes={allNodes}
      />
    </AppShell>
  );
}
