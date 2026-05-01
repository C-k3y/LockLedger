import { motion } from "framer-motion";
import { Star, Award, ExternalLink } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { WalletAvatar } from "@/components/WalletAvatar";
import { mockProfile } from "@/lib/mock-data";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <div className="label-caps mb-1">IDENTITY</div>
          <h1 className="font-display text-2xl font-bold">PROFILE</h1>
        </div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-border p-6 space-y-6">
          <div className="flex items-center gap-4">
            <WalletAvatar address={mockProfile.address} size={48} />
            <div>
              <p className="font-mono text-sm flex items-center gap-2">
                {mockProfile.address} <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-3.5 w-3.5 text-primary fill-primary" />
                <span className="font-mono font-bold text-sm">{mockProfile.reputationScore}</span>
                <span className="label-caps">REPUTATION</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-px bg-border">
            <div className="p-4 bg-background text-center">
              <p className="font-mono text-2xl font-bold">{mockProfile.completedContracts}</p>
              <span className="label-caps">COMPLETED</span>
            </div>
            <div className="p-4 bg-background text-center">
              <p className="font-mono text-2xl font-bold">{mockProfile.totalEarned}</p>
              <span className="label-caps">ETH EARNED</span>
            </div>
            <div className="p-4 bg-background text-center">
              <p className="font-mono text-2xl font-bold">{mockProfile.reviews.length}</p>
              <span className="label-caps">REVIEWS</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {mockProfile.badges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1.5 px-3 py-1 border border-primary text-primary font-mono text-[10px] uppercase tracking-wider">
                <Award className="h-3 w-3" /> {badge}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Reviews */}
        <div>
          <div className="label-caps mb-3">REVIEWS</div>
          <div className="space-y-0">
            {mockProfile.reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`p-5 border border-border space-y-3 ${i > 0 ? "border-t-0" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <WalletAvatar address={r.from} size={16} />
                    <span className="font-mono text-xs">{r.from}</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: r.rating }).map((_, j) => (
                      <Star key={j} className="h-3 w-3 text-primary fill-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{r.comment}</p>
                <p className="font-mono text-[10px] text-muted-foreground uppercase">{r.date}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
