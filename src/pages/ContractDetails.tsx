import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, CheckCircle2, Clock, AlertTriangle, Upload, ThumbsUp, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";
import { mockContracts } from "@/lib/mock-data";
import { WalletAvatar } from "@/components/WalletAvatar";
import { toast } from "sonner";

const milestoneStatusIcon: Record<string, React.ReactNode> = {
  pending: <Clock className="h-3.5 w-3.5 text-muted-foreground" />,
  submitted: <AlertTriangle className="h-3.5 w-3.5 text-warning" />,
  approved: <CheckCircle2 className="h-3.5 w-3.5 text-success" />,
};

export default function ContractDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const contract = mockContracts.find((c) => c.id === id);

  if (!contract) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground font-mono text-sm">CONTRACT NOT FOUND</p>
          <Button variant="outline" className="mt-4 font-mono text-xs uppercase border-border" onClick={() => navigate("/contracts")}>
            ← Back
          </Button>
        </div>
      </AppLayout>
    );
  }

  const approvedCount = contract.milestones.filter((m) => m.status === "approved").length;
  const progressPct = (approvedCount / contract.milestones.length) * 100;

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <Button variant="ghost" onClick={() => navigate("/contracts")} className="gap-2 text-muted-foreground font-mono text-xs uppercase -ml-2">
          <ArrowLeft className="h-3 w-3" /> Back
        </Button>

        {/* Header */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-border p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="label-caps">CONTRACT DETAILS</div>
            <span className="font-mono text-xs text-muted-foreground flex items-center gap-1">
              {contract.id} <ExternalLink className="h-3 w-3" />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="label-caps">CLIENT</span>
              <div className="flex items-center gap-2 mt-1">
                <WalletAvatar address={contract.client} size={18} />
                <span className="font-mono text-xs">{contract.client}</span>
              </div>
            </div>
            <div>
              <span className="label-caps">FREELANCER</span>
              <div className="flex items-center gap-2 mt-1">
                <WalletAvatar address={contract.freelancer} size={18} />
                <span className="font-mono text-xs">{contract.freelancer}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-px bg-border">
            <div className="p-4 bg-background text-center">
              <span className="label-caps">ESCROW</span>
              <p className="font-mono font-bold text-xl mt-1 text-primary">{contract.totalAmount} ETH</p>
            </div>
            <div className="p-4 bg-background text-center">
              <span className="label-caps">STATUS</span>
              <p className="font-mono font-bold text-sm mt-2 uppercase">{contract.status}</p>
            </div>
            <div className="p-4 bg-background text-center">
              <span className="label-caps">AUTO-RELEASE</span>
              <p className="font-mono font-bold text-sm mt-2">{contract.autoReleaseHours}H</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="label-caps">PROGRESS</span>
              <span className="font-mono text-[10px] text-muted-foreground">{approvedCount}/{contract.milestones.length}</span>
            </div>
            <div className="status-bar">
              <div className="status-bar-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </motion.div>

        {/* Milestones */}
        <div>
          <div className="label-caps mb-3">MILESTONES</div>
          <div className="space-y-0">
            {contract.milestones.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`p-5 border border-border ${i > 0 ? "border-t-0" : ""} space-y-3 ${
                  m.status === "approved" ? "border-l-2 border-l-success" : m.status === "submitted" ? "border-l-2 border-l-warning" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {milestoneStatusIcon[m.status]}
                    <div>
                      <h3 className="font-mono text-sm font-medium">{m.title}</h3>
                      <p className="label-caps mt-0.5">DUE: {m.deadline}</p>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-sm">{m.amount} ETH</span>
                </div>

                {m.status === "pending" && (
                  <Button size="sm" variant="outline" className="gap-2 font-mono text-xs uppercase border-border" onClick={() => toast.info("Submit work modal opens")}>
                    <Upload className="h-3 w-3" /> Submit
                  </Button>
                )}
                {m.status === "submitted" && (
                  <div className="flex gap-2">
                    <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs uppercase" onClick={() => toast.success("Approved")}>
                      <ThumbsUp className="h-3 w-3" /> Approve
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2 font-mono text-xs uppercase border-destructive text-destructive" onClick={() => toast.error("Dispute raised")}>
                      <ShieldAlert className="h-3 w-3" /> Dispute
                    </Button>
                  </div>
                )}
                {m.status === "approved" && (
                  <span className="font-mono text-[10px] text-success uppercase tracking-wider">✓ Released</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
