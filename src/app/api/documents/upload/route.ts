import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

import { prisma } from "@/lib/db/prisma";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_TYPES = [
  "application/pdf",
  "text/plain",
];

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        {
          error: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
await prisma.user.create({
  data: {
    id: userId,
    clerkId: userId,
    name:
      `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
    email:
      clerkUser.emailAddresses[0]?.emailAddress,
    image: clerkUser.imageUrl,
  },
});
    }

    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "No file provided",
        },
        {
          status: 400,
        }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: "Invalid file type",
        },
        {
          status: 400,
        }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "File too large",
        },
        {
          status: 400,
        }
      );
    }

    const bytes = await file.arrayBuffer();

    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(
      process.cwd(),
      "uploads"
    );

    await mkdir(uploadDir, {
      recursive: true,
    });

    const filename = `${Date.now()}-${file.name}`;

    const filePath = path.join(
      uploadDir,
      filename
    );

    await writeFile(
      filePath,
      buffer
    );

    const document = await prisma.document.create({
      data: {
        userId,
        name: file.name,
        mimeType: file.type,
        size: file.size,
        path: filePath,
      },
    });

    return NextResponse.json(
      {
        success: true,
        document,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "Upload error:",
      error
    );

    return NextResponse.json(
      {
        error: "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}