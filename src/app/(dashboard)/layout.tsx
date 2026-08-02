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
        <header className="sticky top-0 z-40 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur md:hidden">
          <MobileNav />
        </header>

<main className="px-4 py-8 sm:px-6 lg:px-8">
  <div className="mx-auto max-w-7xl">
    {children}
  </div>
</main>
      </div>
    </div>
  );
}