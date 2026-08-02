"use client";

import { useState } from "react";
import {
  Upload,
  FileText,
  X,
  Loader2,
} from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "text/plain",
];

export function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  function handleFile(selectedFile: File) {
    setError("");
    setSuccess("");

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError("Only PDF and TXT files are allowed.");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 10MB.");
      return;
    }

    setFile(selectedFile);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const selected = event.target.files?.[0];

    if (selected) {
      handleFile(selected);
    }
  }

  async function uploadFile() {
    if (!file) return;

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "/api/documents/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Upload failed"
        );
      }

      setSuccess("Document uploaded successfully.");
      setFile(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="w-full">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed p-8 transition hover:bg-accent">
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

      {success && (
        <p className="mt-3 text-sm text-green-600">
          {success}
        </p>
      )}

      {file && (
        <div className="mt-4 space-y-3 rounded-lg border p-4">
          <div className="flex items-center justify-between">
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
              disabled={uploading}
              className="rounded-md p-1 hover:bg-accent"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={uploadFile}
            disabled={uploading}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {uploading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}

            {uploading
              ? "Uploading..."
              : "Upload Document"}
          </button>
        </div>
      )}
    </div>
  );
}