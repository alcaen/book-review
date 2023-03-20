import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { type NextApiRequest, type NextApiResponse } from "next";
import { json } from "stream/consumers";
import { z } from "zod";
import { appRouter } from "../../../server/api/root";
import { createTRPCContext } from "../../../server/api/trpc";

interface CustomRequest extends NextApiRequest {
  body: string;
}

interface books {
  books: {
    title: string;
    author: string;
    category: string;
    resumen: string;
    imageURL: string;
    URL: string;
  }[];
}

const uploadBooks = async (req: CustomRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(400).json({ message: "USE POST" });
  }
  const ctx = await createTRPCContext({ req, res });
  const caller = appRouter.createCaller(ctx);
  if (!req.body) {
    res.status(400).json({ message: "No fine" });
  }

  if (!(typeof req.body === "string")) {
    res.status(400).json({ message: "Body has to be string" });
  }
  try {
    const raw = JSON.parse(req.body) as books;
    const parsedBooks = raw.books;
    const booksAdded = await caller.book.uploadBooks(parsedBooks);
    res.status(200).json(booksAdded);
  } catch (cause) {
    if (cause instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(cause);
      return res.status(httpCode).json(cause);
    }
    console.error(cause);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default uploadBooks;
