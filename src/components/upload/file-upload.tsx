"use client";

import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "text/plain",
];

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  function handleFile(file: File) {
    setError("");

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError("Only PDF and TXT files are allowed.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10MB.");
      return;
    }

    setFile(file);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = event.target.files?.[0];

    if (selected) {
      handleFile(selected);
    }
  }

  return (
    <div className="w-full">
      <label
        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-8 transition hover:bg-accent"
      >
        <Upload className="h-8 w-8" />

        <p className="mt-3 font-medium">
          Click to upload
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          PDF or TXT up to 10MB
        </p>

        <input
          type="file"
          accept=".pdf,.txt"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {error && (
        <p className="mt-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {file && (
        <div className="mt-4 flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5" />

            <div>
              <p className="text-sm font-medium">
                {file.name}
              </p>

              <p className="text-xs text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <button
            onClick={() => setFile(null)}
            className="rounded-md p-1 hover:bg-accent"
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}