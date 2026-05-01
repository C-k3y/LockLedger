import { useState } from "react";
import { Bell, Wallet, ChevronDown, LogOut } from "lucide-react";
import { useWalletContext } from "@/contexts/WalletContext";
import { WalletAvatar } from "@/components/WalletAvatar";
import { ConnectWalletModal } from "@/components/ConnectWalletModal";
import { mockNotifications } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

export function TopBar() {
  const { connected, address, network, disconnect, switchNetwork } = useWalletContext();
  const [walletModalOpen, setWalletModalOpen] = useState(false);
  const navigate = useNavigate();
  const unread = mockNotifications.filter((n) => !n.read).length;

  return (
    <>
      <header className="h-12 border-b border-border bg-background sticky top-0 z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        </div>

        <div className="flex items-center gap-2">
          {connected && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  <span className="h-1.5 w-1.5 bg-success" />
                  {network}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card border-border">
                <DropdownMenuItem onClick={() => switchNetwork("Polygon")} className="font-mono text-xs">Polygon</DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchNetwork("Base")} className="font-mono text-xs">Base</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8">
                <Bell className="h-4 w-4 text-muted-foreground" />
                {unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 bg-primary text-[9px] font-mono font-bold flex items-center justify-center text-primary-foreground">
                    {unread}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-card border-border w-80">
              <div className="px-3 py-2 label-caps">NOTIFICATIONS</div>
              <DropdownMenuSeparator className="bg-border" />
              {mockNotifications.slice(0, 4).map((n) => (
                <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 py-2.5" onClick={() => navigate("/notifications")}>
                  <span className={`text-xs ${n.read ? "text-muted-foreground" : "text-foreground"}`}>{n.message}</span>
                  <span className="text-[10px] text-muted-foreground font-mono">{n.timestamp}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="text-primary text-xs font-mono justify-center uppercase" onClick={() => navigate("/notifications")}>
                View all →
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {connected ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <WalletAvatar address={address || ""} size={20} />
                  <span className="text-xs font-mono">{address}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem onClick={() => navigate("/profile")} className="font-mono text-xs">Profile</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem onClick={disconnect} className="text-destructive font-mono text-xs">
                  <LogOut className="h-3.5 w-3.5 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={() => setWalletModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-mono text-xs uppercase tracking-wider h-8">
              <Wallet className="h-3.5 w-3.5" />
              Connect
            </Button>
          )}
        </div>
      </header>

      <ConnectWalletModal open={walletModalOpen} onOpenChange={setWalletModalOpen} />
    </>
  );
}
