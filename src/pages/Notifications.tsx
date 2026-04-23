import { motion } from "framer-motion";
import { Bell, CheckCircle2, Clock, ShieldAlert, DollarSign } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { mockNotifications } from "@/lib/mock-data";

const typeIcon = {
  milestone: CheckCircle2,
  payment: DollarSign,
  dispute: ShieldAlert,
  general: Bell,
};

export default function NotificationsPage() {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <div className="label-caps mb-1">INBOX</div>
          <h1 className="font-display text-2xl font-bold">NOTIFICATIONS</h1>
        </div>

        <div className="border border-border">
          {mockNotifications.map((n, i) => {
            const Icon = typeIcon[n.type];
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className={`flex items-start gap-4 p-4 transition-colors ${
                  i > 0 ? "border-t border-border" : ""
                } ${!n.read ? "bg-primary/[0.03] border-l-2 border-l-primary" : ""}`}
              >
                <Icon className={`h-4 w-4 mt-0.5 flex-shrink-0 ${n.read ? "text-muted-foreground" : "text-primary"}`} />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${n.read ? "text-muted-foreground" : "text-foreground"}`}>
                    {n.message}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="font-mono text-[10px] text-muted-foreground uppercase">{n.timestamp}</span>
                  </div>
                </div>
                {!n.read && <span className="h-1.5 w-1.5 bg-primary flex-shrink-0 mt-2" />}
              </motion.div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
