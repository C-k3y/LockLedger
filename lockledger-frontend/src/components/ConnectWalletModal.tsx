import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useWalletContext } from "@/contexts/WalletContext";
import { Wallet, Loader2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const wallets = [
  { id: "metamask", name: "MetaMask", icon: "🦊" },
  { id: "walletconnect", name: "WalletConnect", icon: "🔗" },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConnectWalletModal({ open, onOpenChange }: Props) {
  const { connect, connecting, connected } = useWalletContext();

  const handleConnect = async (provider: string) => {
    await connect(provider);
    setTimeout(() => onOpenChange(false), 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border sm:max-w-md rounded-none">
        <DialogHeader>
          <DialogTitle className="font-mono text-sm uppercase tracking-wider flex items-center gap-2">
            <Wallet className="h-4 w-4 text-primary" />
            CONNECT WALLET
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-0 pt-2 border border-border">
          {wallets.map((w, i) => (
            <motion.button
              key={w.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleConnect(w.id)}
              disabled={connecting}
              className={`w-full flex items-center gap-4 p-4 hover:bg-secondary transition-colors disabled:opacity-50 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <span className="text-xl">{w.icon}</span>
              <span className="font-mono text-xs uppercase tracking-wider flex-1 text-left">{w.name}</span>
              {connecting ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : connected ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : null}
            </motion.button>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground font-mono text-center uppercase tracking-wider pt-1">
          By connecting you accept the terms
        </p>
      </DialogContent>
    </Dialog>
  );
}
