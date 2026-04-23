import { motion } from "framer-motion";
import { ShieldAlert, ExternalLink } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";

const disputes = [
  {
    id: "d1",
    contractId: "0x9c0d...1e2f",
    status: "open" as const,
    summary: "Client claims delivered work does not match specifications for milestone 'Database Schema'.",
    clientEvidence: "The API endpoints do not match the agreed specification. Missing 3 out of 8 endpoints.",
    freelancerEvidence: "All endpoints were delivered as per the initial brief. The specification changed mid-project without updating the contract.",
    raisedAt: "2025-04-05",
  },
  {
    id: "d2",
    contractId: "0x4b5c...6d7e",
    status: "resolved" as const,
    summary: "Freelancer did not deliver work within the agreed deadline.",
    clientEvidence: "No work was submitted after 2 weeks past the deadline.",
    freelancerEvidence: "Personal emergency caused the delay. Offered partial refund.",
    raisedAt: "2025-02-18",
  },
];

const statusTag = {
  open: "text-warning border-warning",
  resolved: "text-success border-success",
};

export default function DisputesPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <div className="label-caps mb-1">ARBITRATION</div>
          <h1 className="font-display text-2xl font-bold">DISPUTES</h1>
        </div>

        <div className="space-y-0">
          {disputes.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              className={`border border-border p-6 space-y-5 ${i > 0 ? "border-t-0" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="h-4 w-4 text-warning" />
                  <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
                    {d.contractId} <ExternalLink className="h-3 w-3" />
                  </span>
                </div>
                <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border ${statusTag[d.status]}`}>
                  {d.status}
                </span>
              </div>

              <p className="text-sm">{d.summary}</p>

              <div className="grid md:grid-cols-2 gap-px bg-border">
                <div className="p-4 bg-background space-y-2">
                  <span className="label-caps">CLIENT EVIDENCE</span>
                  <p className="text-sm text-muted-foreground">{d.clientEvidence}</p>
                </div>
                <div className="p-4 bg-background space-y-2">
                  <span className="label-caps">FREELANCER EVIDENCE</span>
                  <p className="text-sm text-muted-foreground">{d.freelancerEvidence}</p>
                </div>
              </div>

              <p className="font-mono text-[10px] text-muted-foreground uppercase">RAISED: {d.raisedAt}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
