import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { mockContracts } from "@/lib/mock-data";
import type { Contract } from "@/lib/mock-data";

const statusTag: Record<string, string> = {
  escrowed: "text-info border-info",
  submitted: "text-warning border-warning",
  released: "text-success border-success",
  cancelled: "text-destructive border-destructive",
  disputed: "text-accent border-accent",
};

function ContractRow({ contract, idx }: { contract: Contract; idx: number }) {
  const navigate = useNavigate();
  const approvedCount = contract.milestones.filter((m) => m.status === "approved").length;
  const progressPct = (approvedCount / contract.milestones.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: idx * 0.04 }}
      onClick={() => navigate(`/contracts/${contract.id}`)}
      className="grid grid-cols-12 items-center gap-4 px-6 py-5 border-b border-border hover:bg-secondary/40 cursor-pointer transition-colors group"
    >
      <div className="col-span-12 md:col-span-1">
        <span className="font-mono text-[10px] text-muted-foreground">{String(idx + 1).padStart(3, "0")}</span>
      </div>
      <div className="col-span-12 md:col-span-3 min-w-0">
        <div className="font-mono text-xs flex items-center gap-1 truncate group-hover:text-primary transition-colors">
          {contract.id} <ExternalLink className="h-3 w-3 flex-shrink-0" />
        </div>
        <div className="font-mono text-[10px] text-muted-foreground mt-1 truncate">
          {contract.client} → {contract.freelancer}
        </div>
      </div>
      <div className="col-span-6 md:col-span-2">
        <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border ${statusTag[contract.status]}`}>
          {contract.status}
        </span>
      </div>
      <div className="col-span-6 md:col-span-2 text-right md:text-left">
        <div className="font-mono font-bold text-sm">{contract.totalAmount} ETH</div>
        <div className="font-mono text-[10px] text-muted-foreground">{approvedCount}/{contract.milestones.length} done</div>
      </div>
      <div className="col-span-12 md:col-span-4">
        <div className="status-bar"><div className="status-bar-fill" style={{ width: `${progressPct}%` }} /></div>
      </div>
    </motion.div>
  );
}

export default function MyContractsPage() {
  const [tab, setTab] = useState<"active" | "completed" | "cancelled">("active");

  const active = mockContracts.filter((c) => c.status === "escrowed" || c.status === "submitted");
  const completed = mockContracts.filter((c) => c.status === "released");
  const cancelled = mockContracts.filter((c) => c.status === "cancelled");
  const contracts = tab === "active" ? active : tab === "completed" ? completed : cancelled;

  const tabs: { id: typeof tab; label: string; count: number }[] = [
    { id: "active", label: "ACTIVE", count: active.length },
    { id: "completed", label: "DONE", count: completed.length },
    { id: "cancelled", label: "CANCELLED", count: cancelled.length },
  ];

  return (
    <AppLayout>
      <div className="-m-4 md:-m-6">
        {/* Header strip */}
        <div className="grid grid-cols-12 border-b border-border">
          <div className="col-span-12 md:col-span-3 p-6 border-r border-border bg-secondary/20">
            <div className="label-caps mb-1">/ MANAGE</div>
            <h1 className="font-display text-2xl font-bold">CONTRACTS_</h1>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              {mockContracts.length} total · {active.length} active
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 flex items-stretch">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex-1 px-6 text-left border-r border-border last:border-r-0 transition-colors ${
                  tab === t.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary/40"
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">{t.label}</div>
                <div className="font-mono text-2xl font-bold mt-1">{String(t.count).padStart(2, "0")}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Column header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 border-b border-border bg-secondary/20">
          <div className="col-span-1 label-caps">#</div>
          <div className="col-span-3 label-caps">CONTRACT / PARTIES</div>
          <div className="col-span-2 label-caps">STATUS</div>
          <div className="col-span-2 label-caps">VALUE</div>
          <div className="col-span-4 label-caps">PROGRESS</div>
        </div>

        {/* Rows */}
        <div>
          {contracts.map((c, i) => (
            <ContractRow key={c.id} contract={c} idx={i} />
          ))}
          {contracts.length === 0 && (
            <p className="text-center text-muted-foreground font-mono text-sm py-16">// NO CONTRACTS</p>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
