import { Sidebar } from "@/components/layout/sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className="md:pl-64">
        <header className="flex h-16 items-center border-b px-6 md:hidden">
          <MobileNav />
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}