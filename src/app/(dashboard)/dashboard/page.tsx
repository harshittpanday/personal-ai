import {
  FileText,
  MessageSquare,
  Database,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Documents",
    value: "0",
    description: "Uploaded files",
    icon: FileText,
  },
  {
    title: "Chats",
    value: "0",
    description: "Conversations",
    icon: MessageSquare,
  },
  {
    title: "Storage Used",
    value: "0 MB",
    description: "Total storage",
    icon: Database,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Your personal AI knowledge workspace.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </h2>

                <Icon className="h-5 w-5" />
              </div>

              <p className="mt-4 text-3xl font-bold">
                {stat.value}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />

            <h2 className="font-semibold">
              Recent Activity
            </h2>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Your uploads and conversations will appear here.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-semibold">
            Quick Actions
          </h2>

          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>📄 Upload a document</p>
            <p>💬 Start a conversation</p>
            <p>🧠 Search your knowledge</p>
          </div>
        </div>
      </section>
    </div>
  );
}