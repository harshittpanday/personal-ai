import Link from "next/link";
import {
  Brain,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Documents",
    href: "/documents",
    icon: FileText,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-background md:flex md:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border">
            <Brain className="h-5 w-5" />
          </div>

          <span className="font-semibold tracking-tight">
            Personal AI
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <Icon className="h-5 w-5" />

              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <UserButton />

          <div className="text-sm">
            <p className="font-medium">
              Account
            </p>

            <p className="text-xs text-muted-foreground">
              Manage profile
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}