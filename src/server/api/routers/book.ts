// trpc error to hanlde and send erros
import { TRPCError } from "@trpc/server";
// for validation and typescript in exteroids
import { z } from "zod";
// router, public api route, protectted api route
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
// book router where i handle the book actions like review, score, delete and get all kind of details
export const bookRouter = createTRPCRouter({
  // get books to render and if an input is specified filter it. otherwise get all books
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
  // get all unique categoriers of the books used to give the filter category names
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
  // get all unique authors of the books used to give the filter author names
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
  // used to get the average score of a specifig book this uses prisma agregate
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
  // get the total number of review of a specifig book this uses prisma agregate
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
  // mutation to handle the score from an  specific user
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
  // used to get the list of all reviews
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
  // used to review a book it uses upsert means: update if exists or create if dont
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
  // used to delete a certain review
  deleteReview: protectedProcedure
    .input(
      z.object({
        reviewId: z.string().min(1),
        currentUserId: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const review = await ctx.prisma.review.findUnique({
        where: { id: input.reviewId },
      });
      if (!review) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Review Not Found",
          cause: "Review Not Found",
        });
      }
      if (review.userId !== input.currentUserId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Thats not your review",
          cause: "Thats not your review",
        });
      }
      const deletedReview = await ctx.prisma.review.delete({
        where: { id: input.reviewId },
      });
      return deletedReview;
    }),
  // Used to upload books, exposed to REST in pages/api/book/upload_books
  uploadBooks: publicProcedure
    .input(
      z
        .object({
          title: z.string().min(1),
          author: z.string().min(1),
          category: z.string().min(1),
          resumen: z.string().min(1),
          imageURL: z.string().min(1),
          URL: z.string().min(1),
        })
        .array()
    )
    .mutation(async ({ ctx, input }) => {
      if (!input) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Yo have to add at least one book",
          cause: "Yo have to add at least one book",
        });
      }
      const newBooks = await ctx.prisma.book.createMany({
        data: input,
        skipDuplicates: true,
      });
      if (!newBooks) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No books created",
          cause: "No books created",
        });
      }

      return { new_books_added: newBooks.count };
    }),
});
