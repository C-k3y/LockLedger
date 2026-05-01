import { Home, LayoutDashboard, FilePlus, FolderOpen, User } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Board", url: "/dashboard", icon: LayoutDashboard },
  { title: "New", url: "/create", icon: FilePlus },
  { title: "Jobs", url: "/contracts", icon: FolderOpen },
  { title: "You", url: "/profile", icon: User },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border md:hidden">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            end={item.url === "/"}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-muted-foreground transition-colors"
            activeClassName="text-primary"
          >
            <item.icon className="h-4 w-4" />
            <span className="font-mono text-[9px] uppercase tracking-wider">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
