import { motion } from "framer-motion";
import { FileCheck, Clock, CheckCircle2, Star, ExternalLink, ArrowUpRight } from "lucide-react";
import { mockContracts, mockActivities } from "@/lib/mock-data";
import { AppLayout } from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";

const stats = [
  { label: "ACTIVE", value: mockContracts.filter((c) => c.status === "escrowed" || c.status === "submitted").length, icon: FileCheck, sub: "contracts" },
  { label: "LOCKED", value: "2.0", icon: Clock, sub: "ETH" },
  { label: "RELEASED", value: mockContracts.filter((c) => c.status === "released").length, icon: CheckCircle2, sub: "complete" },
  { label: "REP", value: "4.8", icon: Star, sub: "/ 5.00" },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="space-y-0 -m-4 md:-m-6">
        {/* Top meta row */}
        <div className="grid grid-cols-12 border-b border-border">
          <div className="col-span-12 md:col-span-3 p-6 border-r border-border bg-secondary/20">
            <div className="label-caps mb-1">/ OVERVIEW</div>
            <h1 className="font-display text-2xl font-bold">DASHBOARD_</h1>
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              Real-time state of your escrow positions.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9 grid grid-cols-2 lg:grid-cols-4 gap-px bg-border">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.06 }}
                className="bg-background p-5 flex flex-col justify-between min-h-[120px]"
              >
                <div className="flex items-center justify-between">
                  <span className="label-caps">{s.label}</span>
                  <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <div className="text-3xl font-mono font-bold text-primary">{s.value}</div>
                  <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity + sidebar grid */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-3 p-6 border-r border-border">
            <div className="label-caps mb-1">/ FEED</div>
            <h2 className="font-display text-lg font-bold">RECENT_</h2>
            <p className="text-xs text-muted-foreground mt-2 font-mono leading-relaxed">
              Tx-level events from your active contracts.
            </p>
            <button
              onClick={() => navigate("/contracts")}
              className="mt-4 text-[10px] font-mono uppercase tracking-wider text-primary hover:underline flex items-center gap-1"
            >
              ALL CONTRACTS <ArrowUpRight className="h-3 w-3" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="col-span-12 md:col-span-9"
          >
            {mockActivities.map((a, i) => (
              <div
                key={a.id}
                className={`flex items-start justify-between gap-4 px-6 py-4 hover:bg-secondary/40 transition-colors ${i < mockActivities.length - 1 ? "border-b border-border" : ""}`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <span className="font-mono text-[10px] text-muted-foreground w-6 mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <p className="text-sm truncate">{a.action}</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                      {a.contractId}
                      <ExternalLink className="h-2.5 w-2.5" />
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap uppercase">{a.timestamp}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
