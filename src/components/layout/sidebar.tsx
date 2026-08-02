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
    <aside className="fixed hidden h-screen w-64 border-r bg-card md:block">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Brain className="h-6 w-6" />

        <span className="font-semibold">
          Personal AI
        </span>
      </div>

      <nav className="space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-accent"
            >
              <Icon className="h-5 w-5" />

              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-0 flex w-full items-center gap-3 border-t p-4">
        <UserButton />

        <span className="text-sm text-muted-foreground">
          Account
        </span>
      </div>
    </aside>
  );
}