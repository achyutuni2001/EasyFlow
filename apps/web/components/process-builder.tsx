"use client";

import "@xyflow/react/dist/style.css";

import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  ReactFlowProvider,
  addEdge as rfAddEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
  MarkerType,
} from "@xyflow/react";
import {
  ArrowRightLeft,
  Factory,
  PackageCheck,
  PackagePlus,
  PanelLeft,
  RotateCcw,
  Save,
  ShieldCheck,
  ShoppingCart,
  Trash2,
  Truck,
  Warehouse,
  X,
} from "lucide-react";

import { tenantSeeds } from "@/lib/tenant-seeds";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CanvasNode } from "@/components/canvas-node";
import { CanvasEditContext } from "@/lib/canvas-context";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NodeType =
  | "raw_material"
  | "procurement"
  | "supplier"
  | "quality_check"
  | "warehouse"
  | "inventory_control"
  | "production"
  | "dispatch";

export type ProcessNode = {
  id: string;
  label: string;
  type: NodeType;
  owner: string;
  description: string;
  location: string;
  x: number;
  y: number;
};

export type ProcessEdge = {
  id: string;
  from: string;
  to: string;
  label: string;
};

export type TenantProcess = {
  tenantName: string;
  processName: string;
  objective: string;
  businessUnit: string;
  workflowOwner: string;
  nodes: ProcessNode[];
  edges: ProcessEdge[];
};

type NodeDraft = Omit<ProcessNode, "id">;

// ─── Storage ──────────────────────────────────────────────────────────────────

export const STORAGE_KEY = "easyflow-process-builder-v3";

// ─── Node type metadata ───────────────────────────────────────────────────────

export const nodeTypesMeta: { type: NodeType; label: string; icon: typeof Warehouse; accent: string }[] = [
  { type: "raw_material",      label: "Raw Material",     icon: PackagePlus,  accent: "text-primary" },
  { type: "procurement",       label: "Procurement",      icon: ShoppingCart, accent: "text-secondary" },
  { type: "supplier",          label: "Supplier",         icon: ArrowRightLeft, accent: "text-accent" },
  { type: "quality_check",     label: "Quality Check",    icon: ShieldCheck,  accent: "text-primary" },
  { type: "warehouse",         label: "Warehouse",        icon: Warehouse,    accent: "text-secondary" },
  { type: "inventory_control", label: "Inventory Control",icon: PackageCheck, accent: "text-accent" },
  { type: "production",        label: "Production",       icon: Factory,      accent: "text-primary" },
  { type: "dispatch",          label: "Dispatch",         icon: Truck,        accent: "text-secondary" },
];

// ─── Seed data ────────────────────────────────────────────────────────────────

export const initialProcesses: TenantProcess[] = [
  {
    tenantName: "Acme Retail",
    processName: "Seasonal Replenishment Flow",
    objective: "Move fast-moving SKUs from stock risk to approved replenishment and regional dispatch.",
    businessUnit: "Retail Supply Planning",
    workflowOwner: "Merchandise Operations",
    nodes: [
      { id: "acme-raw",        label: "Demand Signal",      type: "raw_material",  owner: "Inventory Planning",  location: "Chicago, IL",       description: "SKU velocity and low stock thresholds create replenishment demand.",                        x: 60,   y: 120 },
      { id: "acme-proc",       label: "Buyer Review",       type: "procurement",   owner: "Procurement Team",    location: "New York, NY",      description: "Buyers validate quantity, budget, and supplier shortlist.",                                x: 420,  y: 240 },
      { id: "acme-warehouse",  label: "Regional Warehouse", type: "warehouse",     owner: "Warehouse Ops",       location: "Los Angeles, CA",   description: "Inbound stock is assigned to the region with highest demand pressure.",                    x: 780,  y: 120 },
      { id: "acme-dispatch",   label: "Store Dispatch",     type: "dispatch",      owner: "Logistics",           location: "Atlanta, GA",       description: "Approved replenishment is sent to priority stores for launch week.",                       x: 1140, y: 260 },
    ],
    edges: [
      { id: "ae-1", from: "acme-raw",       to: "acme-proc",      label: "Review request" },
      { id: "ae-2", from: "acme-proc",      to: "acme-warehouse",  label: "PO approved"    },
      { id: "ae-3", from: "acme-warehouse", to: "acme-dispatch",  label: "Allocate stock" },
    ],
  },
  {
    tenantName: "Nova Manufacturing",
    processName: "Plant Replenishment Flow",
    objective: "Restore plant stock before assembly lines lose scheduled hours.",
    businessUnit: "Factory Materials",
    workflowOwner: "Plant Operations",
    nodes: [
      { id: "nova-raw",      label: "Raw Material Threshold", type: "raw_material",  owner: "Materials Planning", location: "Detroit, MI",     description: "Steel, resin, and electrical parts are checked against plant coverage targets.", x: 60,   y: 200 },
      { id: "nova-supplier", label: "Supplier Allocation",    type: "supplier",      owner: "Vendor Management",  location: "Pittsburgh, PA",  description: "Preferred supplier is selected by lead time and fill-rate score.",             x: 420,  y: 60  },
      { id: "nova-quality",  label: "Quality Gate",           type: "quality_check", owner: "QA Operations",      location: "Detroit, MI",     description: "Incoming material certification is validated before release to the plant.",    x: 780,  y: 260 },
      { id: "nova-prod",     label: "Plant Feed",             type: "production",    owner: "Plant Operations",   location: "Detroit, MI",     description: "Approved material is moved into production staging for the active schedule.", x: 1140, y: 120 },
    ],
    edges: [
      { id: "ne-1", from: "nova-raw",      to: "nova-supplier", label: "Source request"   },
      { id: "ne-2", from: "nova-supplier", to: "nova-quality",  label: "Material inbound" },
      { id: "ne-3", from: "nova-quality",  to: "nova-prod",     label: "Release to plant" },
    ],
  },
  {
    tenantName: "BlueHarbor Foods",
    processName: "Cold Chain Dispatch Flow",
    objective: "Coordinate temperature-sensitive replenishment across distribution hubs.",
    businessUnit: "Cold Chain Distribution",
    workflowOwner: "Distribution Operations",
    nodes: [
      { id: "blue-supplier",  label: "Supplier Pickup",      type: "supplier",      owner: "Vendor Scheduling",  location: "Miami, FL",        description: "Seafood and chilled goods are confirmed for time-boxed pickup windows.",  x: 60,   y: 240 },
      { id: "blue-quality",   label: "Temperature Check",    type: "quality_check", owner: "Cold Chain QA",      location: "Jacksonville, FL", description: "Each load is inspected against compliance ranges before receiving.",     x: 420,  y: 80  },
      { id: "blue-warehouse", label: "Cold Storage Hub",     type: "warehouse",     owner: "Distribution Ops",   location: "Nashville, TN",    description: "Goods are staged by route and shelf-life priority.",                   x: 780,  y: 250 },
      { id: "blue-dispatch",  label: "Store Route Dispatch", type: "dispatch",      owner: "Fleet Coordination", location: "Charlotte, NC",    description: "Multi-stop routes are released to local grocery partners.",            x: 1140, y: 100 },
    ],
    edges: [
      { id: "be-1", from: "blue-supplier",  to: "blue-quality",   label: "Receive load"          },
      { id: "be-2", from: "blue-quality",   to: "blue-warehouse", label: "Store approved pallets" },
      { id: "be-3", from: "blue-warehouse", to: "blue-dispatch",  label: "Dispatch route"         },
    ],
  },
  {
    tenantName: "Northstar Medical Supply",
    processName: "Hospital Restock Approval",
    objective: "Route urgent care replenishment through compliance and warehouse release.",
    businessUnit: "Healthcare Fulfillment",
    workflowOwner: "Clinical Accounts",
    nodes: [
      { id: "north-proc",      label: "Clinical Demand Review", type: "procurement",   owner: "Hospital Accounts", location: "Minneapolis, MN", description: "Critical restock demand is prioritized by procedure schedule and SLA.", x: 60,   y: 120 },
      { id: "north-quality",   label: "Regulatory Hold",        type: "quality_check", owner: "Compliance",        location: "Minneapolis, MN", description: "Lot checks and regulated item approvals are completed before fulfillment.", x: 420,  y: 260 },
      { id: "north-warehouse", label: "Medical Warehouse",      type: "warehouse",     owner: "Fulfillment Center",location: "Memphis, TN",     description: "Picked stock is staged by hospital priority and courier window.",        x: 780,  y: 100 },
      { id: "north-dispatch",  label: "Courier Handoff",        type: "dispatch",      owner: "Last Mile",         location: "Chicago, IL",     description: "Time-sensitive deliveries are released to healthcare courier partners.", x: 1140, y: 250 },
    ],
    edges: [
      { id: "no-1", from: "north-proc",      to: "north-quality",   label: "Approve request" },
      { id: "no-2", from: "north-quality",   to: "north-warehouse", label: "Release order"   },
      { id: "no-3", from: "north-warehouse", to: "north-dispatch",  label: "Deliver"         },
    ],
  },
  {
    tenantName: "Solstice Consumer Electronics",
    processName: "Launch Allocation Flow",
    objective: "Coordinate channel allocation for new product launch inventory.",
    businessUnit: "Launch Logistics",
    workflowOwner: "Commercial Operations",
    nodes: [
      { id: "sol-raw",       label: "Launch Forecast",       type: "raw_material",      owner: "Demand Planning",   location: "Austin, TX",          description: "Forecasted demand defines the initial allocation wave by channel.",                 x: 60,   y: 150 },
      { id: "sol-proc",      label: "Channel Approval",      type: "procurement",        owner: "Commercial Ops",    location: "San Francisco, CA",   description: "Retail, marketplace, and direct channels validate launch quantities.",              x: 420,  y: 60  },
      { id: "sol-inventory", label: "Launch Inventory Gate", type: "inventory_control",  owner: "Inventory Control", location: "Dallas, TX",          description: "Reserved launch stock is matched to each channel allocation target.",              x: 780,  y: 250 },
      { id: "sol-dispatch",  label: "Channel Dispatch",      type: "dispatch",           owner: "Carrier Team",      location: "Los Angeles, CA",     description: "Approved stock is released to stores and e-commerce fulfillment nodes.",           x: 1140, y: 130 },
    ],
    edges: [
      { id: "se-1", from: "sol-raw",       to: "sol-proc",      label: "Allocate demand"  },
      { id: "se-2", from: "sol-proc",      to: "sol-inventory", label: "Reserve stock"    },
      { id: "se-3", from: "sol-inventory", to: "sol-dispatch",  label: "Release inventory"},
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cloneProcesses(items: TenantProcess[]): TenantProcess[] {
  return items.map((p) => ({ ...p, nodes: p.nodes.map((n) => ({ ...n })), edges: p.edges.map((e) => ({ ...e })) }));
}

function defaultDraft(type: NodeType = "warehouse"): NodeDraft {
  return { label: "", type, owner: "", description: "", location: "", x: 200, y: 200 };
}

const rfNodeTypes: NodeTypes = { workflowNode: CanvasNode };

function toRfNode(n: ProcessNode): Node {
  return {
    id: n.id,
    position: { x: n.x, y: n.y },
    type: "workflowNode",
    data: { label: n.label, type: n.type, owner: n.owner, description: n.description, location: n.location },
  };
}

function toRfEdge(e: ProcessEdge): Edge {
  return {
    id: e.id,
    source: e.from,
    target: e.to,
    label: e.label,
    type: "smoothstep",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(89,225,217,0.9)" },
    style: { stroke: "rgba(89,225,217,0.5)", strokeWidth: 2.5 },
    labelStyle: { fill: "rgba(238,244,251,0.7)", fontSize: 11, fontFamily: "inherit" },
    labelBgStyle: { fill: "rgba(6,17,29,0.85)", borderRadius: "6px" },
    labelBgPadding: [6, 3] as [number, number],
  };
}

// ─── Inner ReactFlow canvas ───────────────────────────────────────────────────

type FlowCanvasProps = {
  processNodes: ProcessNode[];
  processEdges: ProcessEdge[];
  canvasKey: string;
  onNodeClick: (id: string) => void;
  onNodeDragStop: (id: string, x: number, y: number) => void;
  onConnect: (from: string, to: string) => void;
  onNodesDelete: (ids: string[]) => void;
  onEdgesDelete: (ids: string[]) => void;
  onReady: (api: {
    addNode: (n: Node) => void;
    removeNode: (id: string) => void;
    addEdge: (e: Edge) => void;
    removeEdge: (id: string) => void;
    updateNodeData: (id: string, data: Record<string, unknown>) => void;
  }) => void;
};

function FlowCanvas({ processNodes, processEdges, canvasKey, onNodeClick, onNodeDragStop, onConnect, onNodesDelete, onEdgesDelete, onReady }: FlowCanvasProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(processNodes.map(toRfNode));
  const [edges, setEdges, onEdgesChange] = useEdgesState(processEdges.map(toRfEdge));
  const { fitView } = useReactFlow();

  useEffect(() => {
    onReady({
      addNode: (n) => setNodes((prev) => [...prev, n]),
      removeNode: (id) => setNodes((prev) => prev.filter((n) => n.id !== id)),
      addEdge: (e) => setEdges((prev) => [...prev, e]),
      removeEdge: (id) => setEdges((prev) => prev.filter((e) => e.id !== id)),
      updateNodeData: (id, data) => setNodes((prev) =>
        prev.map((n) => n.id === id ? { ...n, data: { ...n.data, ...data } } : n)
      ),
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(() => fitView({ padding: 0.12, duration: 500 }), 100);
    return () => clearTimeout(t);
  }, [canvasKey, fitView]);

  const handleConnect = useCallback(
    (conn: Connection) => {
      if (!conn.source || !conn.target || conn.source === conn.target) return;
      const e: ProcessEdge = { id: `${conn.source}-${conn.target}-${Date.now()}`, from: conn.source, to: conn.target, label: "Transition" };
      setEdges((prev) => rfAddEdge(toRfEdge(e), prev));
      onConnect(conn.source, conn.target);
    },
    [setEdges, onConnect]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={rfNodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={(_, node) => onNodeClick(node.id)}
      onNodeDragStop={(_, node) => onNodeDragStop(node.id, Math.round(node.position.x), Math.round(node.position.y))}
      onConnect={handleConnect}
      onNodesDelete={(d) => onNodesDelete(d.map((n) => n.id))}
      onEdgesDelete={(d) => onEdgesDelete(d.map((e) => e.id))}
      deleteKeyCode="Delete"
      minZoom={0.08}
      maxZoom={3}
      fitView
      fitViewOptions={{ padding: 0.12 }}
      proOptions={{ hideAttribution: true }}
      className="h-full w-full"
    >
      {/* Primary grid lines */}
      <Background variant={BackgroundVariant.Lines} gap={40} color="rgba(89,225,217,0.07)" />
      {/* Secondary dot intersections */}
      <Background id="bg-dots" variant={BackgroundVariant.Dots} gap={40} size={2} color="rgba(89,225,217,0.22)" />
      <Controls
        position="bottom-left"
        showInteractive={false}
        className="[&>button]:!rounded-xl [&>button]:!border-white/10 [&>button]:!bg-slate-900/90 [&>button]:!text-white/60 [&>button:hover]:!bg-slate-800 [&>button]:!backdrop-blur-xl"
      />
      <MiniMap
        position="bottom-right"
        className="!rounded-2xl !border !border-white/10 !bg-slate-950/80 !backdrop-blur-xl"
        nodeColor={(n) => {
          const t = (n.data as { type: string }).type;
          if (["raw_material", "quality_check", "production"].includes(t)) return "hsl(25,95%,63%)";
          if (["supplier", "inventory_control"].includes(t)) return "hsl(82,78%,71%)";
          return "hsl(184,73%,61%)";
        }}
        maskColor="rgba(6,17,29,0.75)"
        zoomable
        pannable
      />
    </ReactFlow>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProcessBuilder() {
  const router = useRouter();
  const [processes, setProcesses] = useState<TenantProcess[]>(cloneProcesses(initialProcesses));
  const [selectedTenant, setSelectedTenant] = useState(initialProcesses[0].tenantName);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draft, setDraft] = useState<NodeDraft>(defaultDraft());
  const [savedAt, setSavedAt] = useState("Seeded demo state");

  // Panel state
  const [panelOpen, setPanelOpen] = useState(true);
  const [inspectorOpen, setInspectorOpen] = useState(false);

  const rfApi = useRef<{
    addNode: (n: Node) => void;
    removeNode: (id: string) => void;
    addEdge: (e: Edge) => void;
    removeEdge: (id: string) => void;
    updateNodeData: (id: string, data: Record<string, unknown>) => void;
  } | null>(null);

  const currentProcess = processes.find((p) => p.tenantName === selectedTenant) ?? processes[0];
  const canvasKey = currentProcess.tenantName;
  const selectedNode = currentProcess.nodes.find((n) => n.id === selectedNodeId) ?? null;

  // ── Persistence ────────────────────────────────────────────────────────────

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as TenantProcess[];
      if (!Array.isArray(parsed) || parsed.length === 0) return;
      const totalNodes = parsed.reduce((s, p) => s + (p.nodes?.length ?? 0), 0);
      if (totalNodes === 0) { window.localStorage.removeItem(STORAGE_KEY); return; }
      const merged = parsed.map((sp) => {
        if (!sp.nodes || sp.nodes.length === 0) {
          const seed = initialProcesses.find((s) => s.tenantName === sp.tenantName);
          return seed ? { ...sp, nodes: seed.nodes.map((n) => ({ ...n })), edges: seed.edges.map((e) => ({ ...e })) } : sp;
        }
        return sp;
      });
      startTransition(() => {
        setProcesses(merged);
        setSelectedTenant(merged[0].tenantName);
        setSavedAt("Loaded from browser");
      });
    } catch { window.localStorage.removeItem(STORAGE_KEY); }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(processes));
    setSavedAt(`Saved ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`);
  }, [processes]);

  // Respect ?tenant= query param to open a specific tenant's canvas
  const searchParams = useSearchParams();
  useEffect(() => {
    const t = searchParams?.get("tenant");
    if (t) {
      const matched = processes.find((p) => p.tenantName === t);
      if (matched) setSelectedTenant(t);
    }
  }, [searchParams, processes]);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function updateCurrentProcess(mutator: (p: TenantProcess) => TenantProcess) {
    setProcesses((prev) => prev.map((p) => (p.tenantName === selectedTenant ? mutator(p) : p)));
  }

  function selectNode(id: string) {
    const node = currentProcess.nodes.find((n) => n.id === id);
    if (!node) return;
    setSelectedNodeId(id);
    setDraft({ label: node.label, type: node.type, owner: node.owner, description: node.description, location: node.location, x: node.x, y: node.y });
    setInspectorOpen(true);
  }

  function switchTenant(name: string) {
    const next = processes.find((p) => p.tenantName === name);
    if (!next) return;
    startTransition(() => {
      setSelectedTenant(name);
      setSelectedNodeId(null);
      setInspectorOpen(false);
    });
  }

  // ── Node actions ───────────────────────────────────────────────────────────

  function createNode(type: NodeType) {
    const idx = currentProcess.nodes.length + 1;
    const col = (idx - 1) % 4;
    const row = Math.floor((idx - 1) / 4);
    const newNode: ProcessNode = {
      // use Date.now() suffix to guarantee unique IDs even if canvas is reset
      id: `${currentProcess.tenantName.toLowerCase().replace(/\s+/g, "-")}-${type}-${Date.now()}`,
      label: "",
      type,
      owner: "",
      description: "",
      location: "",
      x: 80 + col * 360,
      y: 80 + row * 220,
    };
    updateCurrentProcess((p) => ({ ...p, nodes: [...p.nodes, newNode] }));
    rfApi.current?.addNode(toRfNode(newNode));
    // Set state directly — don't call selectNode() which depends on async state propagation
    setSelectedNodeId(newNode.id);
    setDraft({ label: "", type, owner: "", description: "", location: "", x: newNode.x, y: newNode.y });
    setInspectorOpen(true);
  }

  function saveNode() {
    if (!selectedNodeId) return;
    updateCurrentProcess((p) => ({
      ...p,
      nodes: p.nodes.map((n) => (n.id === selectedNodeId ? { ...n, ...draft } : n)),
    }));
    // Update the ReactFlow visual immediately so the canvas reflects the new data
    rfApi.current?.updateNodeData(selectedNodeId, {
      label: draft.label,
      type: draft.type,
      owner: draft.owner,
      description: draft.description,
      location: draft.location,
    });
    setInspectorOpen(false);
  }

  function deleteSelectedNode() {
    if (!selectedNodeId) return;
    const next = currentProcess.nodes.filter((n) => n.id !== selectedNodeId);
    updateCurrentProcess((p) => ({
      ...p,
      nodes: next,
      edges: p.edges.filter((e) => e.from !== selectedNodeId && e.to !== selectedNodeId),
    }));
    rfApi.current?.removeNode(selectedNodeId);
    setSelectedNodeId(null);
    setInspectorOpen(false);
  }

  // ── Canvas callbacks ───────────────────────────────────────────────────────

  const handleNodeClick = useCallback((id: string) => {
    router.push(`/workflows/${id}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const handleNodeDragStop = useCallback((id: string, x: number, y: number) => {
    updateCurrentProcess((p) => ({
      ...p,
      nodes: p.nodes.map((n) => (n.id === id ? { ...n, x, y } : n)),
    }));
    if (selectedNodeId === id) setDraft((prev) => ({ ...prev, x, y }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTenant, selectedNodeId]);

  const handleConnect = useCallback((from: string, to: string) => {
    const id = `${from}-${to}-${Date.now()}`;
    updateCurrentProcess((p) => ({ ...p, edges: [...p.edges, { id, from, to, label: "Transition" }] }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTenant]);

  const handleNodesDelete = useCallback((ids: string[]) => {
    updateCurrentProcess((p) => ({
      ...p,
      nodes: p.nodes.filter((n) => !ids.includes(n.id)),
      edges: p.edges.filter((e) => !ids.includes(e.from) && !ids.includes(e.to)),
    }));
    setSelectedNodeId(null);
    setInspectorOpen(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTenant]);

  const handleEdgesDelete = useCallback((ids: string[]) => {
    updateCurrentProcess((p) => ({ ...p, edges: p.edges.filter((e) => !ids.includes(e.id)) }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTenant]);

  // ── Resets ─────────────────────────────────────────────────────────────────

  function resetAllTenants() {
    const fresh = cloneProcesses(initialProcesses);
    window.localStorage.removeItem(STORAGE_KEY);
    startTransition(() => {
      setProcesses(fresh);
      setSelectedTenant(fresh[0].tenantName);
      setSelectedNodeId(null);
      setInspectorOpen(false);
      setSavedAt("Reset to demo data");
    });
  }

  // ─────────────────────────────────────────────────────────────────────────────

  // Context value: lets canvas nodes open the inspector without prop drilling
  const canvasContextValue = useMemo(
    () => ({ editNode: selectNode }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTenant]
  );

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <CanvasEditContext.Provider value={canvasContextValue}>
    <div className="relative h-full w-full overflow-hidden">

      {/* ── Full-viewport React Flow ──────────────────────────────── */}
      <ReactFlowProvider>
        <FlowCanvas
          key={canvasKey}
          processNodes={currentProcess.nodes}
          processEdges={currentProcess.edges}
          canvasKey={canvasKey}
          onNodeClick={handleNodeClick}
          onNodeDragStop={handleNodeDragStop}
          onConnect={handleConnect}
          onNodesDelete={handleNodesDelete}
          onEdgesDelete={handleEdgesDelete}
          onReady={(api) => { rfApi.current = api; }}
        />
      </ReactFlowProvider>

      {/* ── Floating top bar ──────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
        {/* Left: panel toggle */}
        <button
          type="button"
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 text-white/60 backdrop-blur-xl transition hover:bg-slate-900 hover:text-white"
          onClick={() => setPanelOpen((o) => !o)}
        >
          <PanelLeft className="h-4 w-4" />
        </button>

        {/* Center: tenant + process info */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-2 backdrop-blur-xl">
          <select
            className="border-0 bg-transparent text-sm font-medium text-white outline-none"
            value={selectedTenant}
            onChange={(e) => switchTenant(e.target.value)}
          >
            {tenantSeeds.map((t) => <option key={t.name} value={t.name}>{t.name}</option>)}
          </select>
          <span className="text-white/20">·</span>
          <span className="max-w-[200px] truncate text-xs text-white/50">{currentProcess.processName}</span>
        </div>

        {/* Right: save status + reset */}
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-slate-950/80 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-xl">
            <Save className="h-3 w-3 text-secondary" />
            {savedAt}
          </div>
          <button
            type="button"
            onClick={resetAllTenants}
            className="flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 text-white/50 backdrop-blur-xl transition hover:bg-slate-900 hover:text-white"
            title="Reset all demo data"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* ── Floating right panel ──────────────────────────────────── */}
      {panelOpen && (
        <div className="absolute right-4 top-16 z-10 flex max-h-[calc(100vh-120px)] w-72 flex-col overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/90 shadow-[0_32px_80px_rgba(0,0,0,0.6)] backdrop-blur-2xl">

          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">Node Palette</span>
            <button onClick={() => setPanelOpen(false)} className="text-white/30 transition hover:text-white">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Node palette */}
          <div className="overflow-y-auto p-3">
            <div className="grid gap-1.5">
              {nodeTypesMeta.map((item) => (
                <button
                  key={item.type}
                  type="button"
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-left transition hover:border-white/20 hover:bg-white/10"
                  onClick={() => createNode(item.type)}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-slate-950/60">
                    <item.icon className={cn("h-4 w-4", item.accent)} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-[10px] text-white/30">Click to add to canvas</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Hint */}
            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3 text-[11px] leading-5 text-white/40">
              Select a node to edit it. Drag nodes to reposition them. Connect handles to create transitions.
            </div>

            {/* Canvas summary */}
            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/30">Canvas</div>
              <div className="mt-1.5 text-sm font-medium">{currentProcess.nodes.length} nodes</div>
              <div className="text-xs text-white/40">{currentProcess.edges.length} transitions mapped</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Node edit modal (centred popup) ── */}
      {inspectorOpen && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) setInspectorOpen(false); }}
        >
          <div className="relative w-full max-w-lg mx-4 rounded-[28px] border border-white/10 bg-[hsl(217,45%,7%)] shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-5">
              <div>
                <div className="text-[0.65rem] uppercase tracking-[0.28em] text-secondary/70">
                  {selectedNode ? "Edit Node" : "New Node"}
                </div>
                <h2 className="mt-0.5 text-base font-semibold text-white">
                  {draft.label || "Untitled Node"}
                </h2>
              </div>
              <button
                onClick={() => setInspectorOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/40 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Form body */}
            <div className="grid gap-4 px-6 py-5">
              {/* Node name + type row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <label className="text-[0.65rem] uppercase tracking-[0.22em] text-white/40">Node Name *</label>
                  <input
                    autoFocus
                    placeholder="e.g. Buyer Review"
                    className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-secondary/50 focus:bg-white/[0.08]"
                    value={draft.label}
                    onChange={(e) => setDraft((prev) => ({ ...prev, label: e.target.value }))}
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-[0.65rem] uppercase tracking-[0.22em] text-white/40">Type</label>
                  <select
                    className="rounded-2xl border border-white/10 bg-[hsl(217,45%,7%)] px-4 py-2.5 text-sm text-white outline-none transition focus:border-secondary/50"
                    value={draft.type}
                    onChange={(e) => setDraft((prev) => ({ ...prev, type: e.target.value as NodeType }))}
                  >
                    {nodeTypesMeta.map((m) => <option key={m.type} value={m.type}>{m.label}</option>)}
                  </select>
                </div>
              </div>

              {/* Owner + Location row */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-1.5">
                  <label className="text-[0.65rem] uppercase tracking-[0.22em] text-white/40">Owning Team</label>
                  <input
                    placeholder="e.g. Procurement Team"
                    className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-secondary/50 focus:bg-white/[0.08]"
                    value={draft.owner}
                    onChange={(e) => setDraft((prev) => ({ ...prev, owner: e.target.value }))}
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-[0.65rem] uppercase tracking-[0.22em] text-white/40">Location</label>
                  <input
                    placeholder="e.g. Chicago, IL"
                    className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-secondary/50 focus:bg-white/[0.08]"
                    value={draft.location}
                    onChange={(e) => setDraft((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="grid gap-1.5">
                <label className="text-[0.65rem] uppercase tracking-[0.22em] text-white/40">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe what this step owns and when it triggers…"
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder-white/20 outline-none transition focus:border-secondary/50 focus:bg-white/[0.08] resize-none"
                  value={draft.description}
                  onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between border-t border-white/[0.08] px-6 py-4">
              <button
                type="button"
                onClick={deleteSelectedNode}
                className="flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/20"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setInspectorOpen(false)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2 text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={saveNode}
                  className="rounded-2xl bg-secondary/20 border border-secondary/30 px-6 py-2 text-sm font-semibold text-secondary transition hover:bg-secondary/30"
                >
                  Save Node
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </CanvasEditContext.Provider>
  );
}
