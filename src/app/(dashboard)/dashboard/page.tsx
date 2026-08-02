import {
  FileText,
  MessageSquare,
  Database,
  Upload,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Documents",
    value: "0",
    description: "Files in your knowledge base",
    icon: FileText,
  },
  {
    title: "Conversations",
    value: "0",
    description: "AI chats created",
    icon: MessageSquare,
  },
  {
    title: "Storage",
    value: "0 MB",
    description: "Total uploaded data",
    icon: Database,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6" />

          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back
          </h1>
        </div>

        <p className="mt-2 text-muted-foreground">
          Your personal AI workspace for managing and exploring knowledge.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border bg-card p-6 transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>

                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>

              <div className="mt-5">
                <p className="text-3xl font-bold">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6">
          <h2 className="font-semibold">
            Recent Documents
          </h2>

          <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
            <FileText className="h-10 w-10 text-muted-foreground" />

            <p className="mt-3 text-sm font-medium">
              No documents yet
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Upload your first document to start building your AI memory.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6">
          <h2 className="font-semibold">
            Quick Actions
          </h2>

          <div className="mt-6 space-y-3">
            <button className="flex w-full items-center gap-3 rounded-xl border p-4 text-left transition hover:bg-accent">
              <Upload className="h-5 w-5" />

              <div>
                <p className="font-medium">
                  Upload Document
                </p>

                <p className="text-sm text-muted-foreground">
                  Add PDFs and text files
                </p>
              </div>
            </button>

            <button className="flex w-full items-center gap-3 rounded-xl border p-4 text-left transition hover:bg-accent">
              <MessageSquare className="h-5 w-5" />

              <div>
                <p className="font-medium">
                  Start Chat
                </p>

                <p className="text-sm text-muted-foreground">
                  Ask questions from your knowledge
                </p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}