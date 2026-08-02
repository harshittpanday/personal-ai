import Link from "next/link";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";
import {
  ArrowRight,
  Brain,
  Database,
  FileText,
  MessageSquare,
  Search,
  Shield,
} from "lucide-react";

const features = [
  {
    title: "Chat with Documents",
    description: "Ask questions across PDFs and text files using RAG.",
    icon: MessageSquare,
  },
  {
    title: "Semantic Search",
    description: "Find relevant information instantly with vector search.",
    icon: Search,
  },
  {
    title: "Gemini Powered",
    description: "Grounded AI responses using your own knowledge base.",
    icon: Brain,
  },
  {
    title: "Secure Storage",
    description: "Your documents remain private and organized.",
    icon: Shield,
  },
  {
    title: "Vector Database",
    description: "Embeddings stored efficiently with PostgreSQL.",
    icon: Database,
  },
  {
    title: "Document Library",
    description: "Manage all your knowledge in one searchable place.",
    icon: FileText,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-20 text-center">
        <span className="rounded-full border px-4 py-1 text-sm font-medium">
          🚀 Personal AI Knowledge Assistant
        </span>

        <h1 className="mt-8 max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
          Your Second Brain,
          <br />
          powered by Gemini.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Upload documents, chat with your knowledge base, and retrieve
          accurate answers using Retrieval-Augmented Generation.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <button className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </SignUpButton>

            <SignInButton mode="modal">
              <button className="rounded-lg border px-6 py-3 text-sm font-semibold transition hover:bg-accent">
                Sign In
              </button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Show>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-2xl border bg-card p-6 transition hover:shadow-lg"
            >
              <Icon className="mb-5 h-8 w-8" />

              <h3 className="text-xl font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>
    </main>
  );
}