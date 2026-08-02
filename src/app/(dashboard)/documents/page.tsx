import {
  FileText,
  Search,
} from "lucide-react";

import { FileUpload } from "@/components/upload/file-upload";

export default function DocumentsPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold tracking-tight">
          Documents
        </h1>

        <p className="mt-2 text-muted-foreground">
          Upload and manage your personal knowledge base.
        </p>
      </section>

      <section className="rounded-2xl border bg-card p-6">
        <h2 className="mb-6 text-lg font-semibold">
          Upload documents
        </h2>

        <FileUpload />
      </section>

      <section className="rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">
            Your Documents
          </h2>

          <Search className="h-5 w-5 text-muted-foreground" />
        </div>

        <div className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed p-8 text-center">
          <FileText className="h-10 w-10 text-muted-foreground" />

          <p className="mt-3 font-medium">
            No documents uploaded
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Your processed documents will appear here.
          </p>
        </div>
      </section>
    </div>
  );
}