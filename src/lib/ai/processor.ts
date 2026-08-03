import { prisma } from "@/lib/db/prisma";
import { parseDocument } from "@/lib/ai/document-parser";
import { chunkText } from "@/lib/ai/chunker";
import { generateEmbeddings } from "@/lib/ai/embeddings";

export async function processDocument(
  documentId: string,
  file: File
) {
  // Mark as processing
  await prisma.document.update({
    where: {
      id: documentId,
    },
    data: {
      status: "PROCESSING",
      error: null,
    },
  });

  try {
    // Parse
    const parsed = await parseDocument(file);

    // Chunk
    const chunks = chunkText(parsed.text);

    // Embeddings
    const embeddings = await generateEmbeddings(
      chunks.map((chunk) => chunk.content)
    );

    // Remove existing chunks
    await prisma.documentChunk.deleteMany({
      where: {
        documentId,
      },
    });

    // Store chunks
    for (let i = 0; i < chunks.length; i++) {
      await prisma.documentChunk.create({
        data: {
          documentId,
          content: chunks[i].content,

          // We'll store vectors properly in the next step
          embedding: embeddings[i] as any,
        },
      });
    }

    // Finished
    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        status: "READY",
        processedAt: new Date(),
      },
    });

    return {
      success: true,
      chunkCount: chunks.length,
    };
  } catch (error) {
    console.error(error);

    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        status: "FAILED",
        error:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
    });

    throw error;
  }
}