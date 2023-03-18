import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { hash } from "bcrypt";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const bookRouter = createTRPCRouter({
  getAllBooks: publicProcedure
    .input(
      z.object({
        category: z.string().or(z.undefined()),
        author: z.string().or(z.undefined()),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.author && !input.category) {
        const books = await ctx.prisma.book.findMany({});
        if (!books) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Books Not Found",
            cause: "Books Not Found",
          });
        } else {
          return books;
        }
      }
      if (input.author && !input.category) {
        const books = await ctx.prisma.book.findMany({
          where: { author: input.author },
        });
        if (!books) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Books Not Found",
            cause: "Books Not Found",
          });
        } else {
          return books;
        }
      }
      if (!input.author && input.category) {
        const books = await ctx.prisma.book.findMany({
          where: { category: input.category },
        });
        if (!books) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Books Not Found",
            cause: "Books Not Found",
          });
        } else {
          return books;
        }
      }
      if (input.author && input.category) {
        const books = await ctx.prisma.book.findMany({
          where: { category: input.category, author: input.author },
        });
        if (!books) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Books Not Found",
            cause: "Books Not Found",
          });
        } else {
          return books;
        }
      }
    }),

  getAllCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.book.findMany({
      select: { category: true },
    });
    if (!categories) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No categories found",
        cause: "No categories found",
      });
    } else {
      return categories;
    }
  }),

  getAllAuthors: publicProcedure.query(async ({ ctx }) => {
    const authors = await ctx.prisma.book.findMany({
      select: { author: true },
    });
    if (!authors) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "No authors found",
        cause: "No authors found",
      });
    } else {
      return authors;
    }
  }),

  getScoreBook: publicProcedure
    .input(z.object({ bookId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const score = await ctx.prisma.score.aggregate({
        where: { bookId: input.bookId },
        _avg: { score: true },
      });
      if (!score) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No score found",
          cause: "No score found",
        });
      } else {
        return score;
      }
    }),

  getNumberReviews: publicProcedure
    .input(z.object({ bookId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const numberReviews = await ctx.prisma.review.aggregate({
        where: { bookId: input.bookId },
        _count: { _all: true },
      });
      if (!numberReviews) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Something happen",
          cause: "Something happen",
        });
      } else {
        return numberReviews;
      }
    }),

  scoreBook: protectedProcedure
    .input(
      z.object({
        bookId: z.string().min(1),
        userId: z.string().min(1),
        score: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const scoredBook = await ctx.prisma.score.upsert({
        where: {
          bookId_userId: { bookId: input.bookId, userId: input.userId },
        },
        create: {
          score: input.score,
          book: { connect: { id: input.bookId } },
          user: { connect: { id: input.userId } },
        },
        update: {
          score: input.score,
          book: { connect: { id: input.bookId } },
          user: { connect: { id: input.userId } },
        },
        include: { book: true, user: true },
      });
      return scoredBook;
    }),

  getAllReviews: publicProcedure
    .input(z.object({ bookId: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const reviews = await ctx.prisma.review.findMany({
        where: { bookId: input.bookId },
        orderBy: { createdAt: "desc" },
        include: { user: true, book: true },
      });
      if (!reviews) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Reviews Not Found",
          cause: "Reviews Not Found",
        });
      } else {
        return reviews;
      }
    }),

  reviewBook: protectedProcedure
    .input(
      z.object({
        reviewId: z.string().or(z.undefined()),
        bookId: z.string().min(1),
        userId: z.string().min(1),
        review: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const review = await ctx.prisma.review.upsert({
        where: { id: input.reviewId },
        create: {
          bookId: input.bookId,
          userId: input.userId,
          text: input.review,
        },
        update: {
          text: input.review,
          id: input.reviewId,
        },
        include: { book: true, user: true },
      });
      return review;
    }),
});
