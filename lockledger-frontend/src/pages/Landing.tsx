import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectWalletModal } from "@/components/ConnectWalletModal";
import { LiveLedgerFeed } from "@/components/LiveLedgerFeed";
import { useNavigate } from "react-router-dom";
import { useWalletContext } from "@/contexts/WalletContext";

const steps = [
  {
    num: "01",
    title: "CREATE ESCROW",
    description: "Define milestones, lock funds into the contract.",
  },
  {
    num: "02",
    title: "SUBMIT WORK",
    description: "Freelancer delivers per milestone, evidence on-chain.",
  },
  {
    num: "03",
    title: "RELEASE FUNDS",
    description: "Client approves or funds auto-release. Trustless.",
  },
];

const features = [
  {
    title: "MILESTONE PAYMENTS",
    description: "Incremental, safer funding stages.",
  },
  {
    title: "AUTO-RELEASE TIMER",
    description: "Funds release if client goes silent.",
  },
  {
    title: "ON-CHAIN REPUTATION",
    description: "Every contract builds your verifiable score.",
  },
];

const stats = [
  { label: "TVL", value: "$48.2M" },
  { label: "CONTRACTS", value: "12,847" },
  { label: "DISPUTES", value: "0.4%" },
  { label: "UPTIME", value: "99.98%" },
];

export default function LandingPage() {
  const [walletOpen, setWalletOpen] = useState(false);
  const navigate = useNavigate();
  const { connected } = useWalletContext();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Terminal status bar */}
      <header className="border-b border-border h-10 px-4 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 bg-primary flex items-center justify-center">
            <Lock className="h-3 w-3 text-primary-foreground" />
          </div>
          <span className="font-bold">
            LOCKLEDGER <span className="text-muted-foreground">v0.9.2</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 bg-success animate-blink" /> MAINNET
          </span>
          <span>BLK 19,847,221</span>
          <span>GAS 22 GWEI</span>
        </div>
        <button
          onClick={() =>
            connected ? navigate("/dashboard") : setWalletOpen(true)
          }
          className="bg-primary text-primary-foreground px-3 py-1 font-bold hover:bg-primary/90 flex items-center gap-1.5"
        >
          <Wallet className="h-3 w-3" />
          {connected ? "DASHBOARD" : "CONNECT"}
        </button>
      </header>

      {/* Hero: asymmetric split */}
      <section className="flex-1 grid grid-cols-1 lg:grid-cols-12 border-b border-border min-h-[600px]">
        {/* LEFT — editorial type */}
        <div className="lg:col-span-7 relative p-6 md:p-12 lg:p-16 flex flex-col justify-between border-r border-border">
          <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

          <div className="relative z-10">
            <div className="label-caps flex items-center gap-2 mb-8">
              <span className="h-1.5 w-1.5 bg-primary" />
              ESCROW PROTOCOL / EVM COMPATIBLE
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.9] tracking-tighter"
            >
              PAY WHAT
              <br />
              YOU AGREE.
              <br />
              <span className="text-primary">NOTHING ELSE_</span>
            </motion.h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-md mt-6 leading-relaxed">
              Smart-contract escrow for freelance work. Funds locked on-chain,
              released milestone-by-milestone. No platform fees skimmed. No
              silent disputes.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Button
                onClick={() =>
                  connected ? navigate("/create") : setWalletOpen(true)
                }
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 h-11 text-xs font-mono font-bold uppercase tracking-wider hard-shadow rounded-none"
              >
                {connected ? "DEPLOY CONTRACT" : "CONNECT WALLET"}
                <ArrowRight className="h-3.5 w-3.5 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="px-6 h-11 text-xs font-mono uppercase tracking-wider border-border hover:bg-secondary rounded-none"
              >
                VIEW LEDGER →
              </Button>
            </div>
          </div>

          {/* Bottom stat strip */}
          <div className="relative z-10 grid grid-cols-4 gap-px bg-border mt-12 border border-border">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-3">
                <div className="label-caps">{s.label}</div>
                <div className="font-mono text-base md:text-lg font-bold mt-1 text-primary">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — live ledger rail */}
        <div className="lg:col-span-5 flex flex-col min-h-[400px]">
          <LiveLedgerFeed className="flex-1 border-l-0" />
        </div>
      </section>

      {/* PROCESS — horizontal numbered ribbon */}
      <section className="border-b border-border">
        <div className="grid grid-cols-12 border-b border-border">
          <div className="col-span-12 md:col-span-3 p-6 md:p-10 border-r border-border">
            <div className="label-caps mb-2">/ 003 STEPS</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
              HOW IT
              <br />
              WORKS_
            </h2>
          </div>
          <div className="col-span-12 md:col-span-9 grid md:grid-cols-3">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`p-6 md:p-10 ${i < steps.length - 1 ? "md:border-r border-border" : ""}`}
              >
                <span className="font-mono text-primary text-4xl font-bold block">
                  {step.num}
                </span>
                <h3 className="font-display text-sm font-bold mt-6 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES — left label, right list */}
      <section className="grid grid-cols-12 border-b border-border">
        <div className="col-span-12 md:col-span-3 p-6 md:p-10 border-r border-border bg-secondary/20">
          <div className="label-caps mb-2">/ CAPABILITIES</div>
          <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
            BUILT FOR
            <br />
            <span className="text-primary">TRUST_</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
            Every primitive in LockLedger is verifiable, deterministic, and
            final.
          </p>
        </div>
        <div className="col-span-12 md:col-span-9">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`flex items-center gap-6 px-6 md:px-10 py-6 group hover:bg-secondary/40 transition-colors ${i < features.length - 1 ? "border-b border-border" : ""}`}
            >
              <span className="font-mono text-muted-foreground text-xs w-8">
                0{i + 1}
              </span>
              <div className="flex-1">
                <h3 className="font-display text-sm font-bold group-hover:text-primary transition-colors">
                  {f.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {f.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-5 w-5 bg-primary flex items-center justify-center">
            <Lock className="h-3 w-3 text-primary-foreground" />
          </div>
          <span className="font-mono font-bold text-[10px] tracking-widest uppercase">
            LOCKLEDGER
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
          © 2026 — LOCKLEDGER
        </p>
      </footer>

      <ConnectWalletModal open={walletOpen} onOpenChange={setWalletOpen} />
    </div>
  );
}
