import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { MobileNav } from "@/components/MobileNav";
import { LiveLedgerFeed } from "@/components/LiveLedgerFeed";

export function AppLayout({ children, hideLedger = false }: { children: ReactNode; hideLedger?: boolean }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <div className="hidden md:block">
          <AppSidebar />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar />
          <div className="flex-1 flex min-h-0">
            <main className="flex-1 min-w-0 p-4 md:p-6 pb-20 md:pb-6 overflow-x-hidden">
              {children}
            </main>
            {!hideLedger && (
              <LiveLedgerFeed className="hidden xl:flex w-[300px] flex-shrink-0 sticky top-12 h-[calc(100vh-3rem)]" />
            )}
          </div>
        </div>
      </div>
      <MobileNav />
    </SidebarProvider>
  );
}
