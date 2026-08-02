"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Brain,
  FileText,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Settings,
  X,
} from "lucide-react";

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

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 transition hover:bg-accent md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-6 w-6" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />

          <aside className="relative h-full w-72 border-r bg-background p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-6 w-6" />

                <span className="font-semibold">
                  Personal AI
                </span>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="mt-8 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-accent"
                  >
                    <Icon className="h-5 w-5" />

                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}