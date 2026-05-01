import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { mockLedger, type LedgerEvent } from "@/lib/mock-data";

const actionColor: Record<LedgerEvent["action"], string> = {
  DEPLOY: "text-info",
  FUND: "text-primary",
  SUBMIT: "text-warning",
  RELEASE: "text-success",
  DISPUTE: "text-destructive",
  APPROVE: "text-success",
};

export function LiveLedgerFeed({ className = "" }: { className?: string }) {
  const [events, setEvents] = useState<LedgerEvent[]>(mockLedger);
  const [block, setBlock] = useState(19847221);

  // Simulate live block updates
  useEffect(() => {
    const t = setInterval(() => setBlock((b) => b + 1), 4000);
    return () => clearInterval(t);
  }, []);

  // Rotate events to simulate stream
  useEffect(() => {
    const t = setInterval(() => {
      setEvents((prev) => {
        const [first, ...rest] = prev;
        return [...rest, { ...first, id: first.id + Math.random() }];
      });
    }, 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <aside className={`flex flex-col border-l border-border bg-background ${className}`}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Activity className="h-3 w-3 text-primary" />
          <span className="label-caps !text-foreground">LIVE LEDGER</span>
        </div>
        <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 bg-success animate-blink" />
          BLOCK {block.toLocaleString()}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-border/60">
          {events.map((e, i) => (
            <div
              key={e.id}
              className="px-4 py-2.5 hover:bg-secondary/40 transition-colors animate-slide-in"
              style={{ animationDelay: `${i * 20}ms` }}
            >
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className={`font-mono text-[10px] font-bold ${actionColor[e.action]}`}>
                  {e.action}
                </span>
                <span className="font-mono text-[9px] text-muted-foreground">{e.time}</span>
              </div>
              <div className="font-mono text-[11px] truncate">
                <span className="text-foreground/80">{e.addr}</span>
                {e.amount && <span className="text-primary ml-1.5">→ {e.amount}</span>}
              </div>
              <div className="font-mono text-[9px] text-muted-foreground mt-0.5">
                #{e.contract} · blk {e.block}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-border px-4 py-2 flex items-center justify-between">
        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
          mainnet
        </span>
        <span className="font-mono text-[9px] text-success uppercase tracking-wider flex items-center gap-1">
          <span className="h-1 w-1 bg-success rounded-full" /> synced
        </span>
      </div>
    </aside>
  );
}
