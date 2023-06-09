// Imports
// Types
import { type NextPage } from "next";
import { type Book } from "@prisma/client";
// UI Component Primitives
// Icons
import { AlertCircle } from "lucide-react";
// Components
import BookSchema from "@/components/Book";
import SideMenu from "@/components/SideMenu";
// Functionals
import Head from "next/head";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@/hooks/use-toast";
// Page
const Home: NextPage = () => {
  // Helpers
  // Router
  const router = useRouter();
  // Toaster
  const { toast } = useToast();
  // Api context
  const utils = api.useContext();
  // States
  const { data: session } = useSession();
  const [books, setBooks] = useState<Book[]>();
  // Filter States
  // Filters Category and Author are managed in back that means it request that specific field
  const [currentCategory, setCurrentCategory] = useState<string | undefined>(
    undefined
  );
  const [currentAuthor, setCurrentAuthor] = useState<string | undefined>(
    undefined
  );
  // Search by the other hand works on front filtering the books. I only used this way to show to ways to solve a problem.
  const [search, setSearch] = useState<string | undefined>();
  // Api calls
  // Get Books => Query
  const getBooks = api.book.getAllBooks.useQuery(
    { author: currentAuthor, category: currentCategory },
    {
      onSuccess(data) {
        setBooks(data);
      },
    }
  );
  // Score Book => Mutation
  const scoreBook = api.book.scoreBook.useMutation({
    async onMutate(newScore) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.book.getScoreBook.cancel({ bookId: newScore.bookId });
    },
    async onSuccess(data, variables, context) {
      toast({
        title: `Book ${data.book.title} succesfully rated.`,
        description: `You give it a score of ${data.score}.`,
      });
      // invalidate the request to update the score of this book
      await utils.book.getScoreBook.invalidate({ bookId: variables.bookId });
    },
    onError(error, variables, context) {
      toast({
        variant: "destructive",
        title: `Upps something happen.`,
        description: `Try again`,
      });
    },
  });
  // Review Book => Mutation
  const reviewBook = api.book.reviewBook.useMutation({
    async onMutate(newReview) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.book.getNumberReviews.cancel({ bookId: newReview.bookId });
      await utils.book.getAllReviews.cancel({ bookId: newReview.bookId });
    },
    async onSuccess(data, variables, context) {
      toast({
        title: `Book ${data.book.title} succesfully rated.`,
        description: `${
          data.user.name ? data.user.name : ""
        } Thanks for your review.`,
      });
      // invalidate the request to update the number of reviews as well the review list of this book
      await utils.book.getNumberReviews.invalidate({
        bookId: variables.bookId,
      });
      await utils.book.getAllReviews.invalidate({ bookId: variables.bookId });
    },
    onError(error, variables, context) {
      toast({
        variant: "destructive",
        title: `Upps something happen.`,
        description: `Try again`,
      });
    },
  });
  // Functions
  // Handle when scored
  const handleScore = ({
    bookId,
    score,
  }: {
    bookId: string;
    score: number;
  }) => {
    if (!session) {
      void router.push("/login");
    } else {
      scoreBook.mutate({ userId: session.user.id, bookId, score });
    }
  };
  // Handle when reviewed
  const handleReview = ({
    bookId,
    review,
    reviewId,
  }: {
    bookId: string;
    review: string;
    reviewId?: string;
  }) => {
    if (!session) {
      void router.push("/login");
    } else {
      reviewBook.mutate({ userId: session.user.id, bookId, review, reviewId });
    }
  };
  // To time optimization other mutations are handled in components.
  return (
    <>
      {/* Head used to seo mainly */}
      <Head>
        <title>Book Review</title>
        <meta name="description" content="Proyecto Controlbox by Alcaen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-row items-center justify-center bg-gradient-to-b from-[#e25706] to-[#9e7830]">
        <div className="fixed top-0 left-0 z-10 lg:absolute">
          <div className="w-72">
            {/* The menu with profile, search and filters */}
            <SideMenu
              session={session}
              setCurrentCategory={setCurrentCategory}
              setCurrentAuthor={setCurrentAuthor}
              search={search}
              setSearch={setSearch}
            />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="flex w-full flex-col items-center justify-center gap-y-10 py-5 pt-20 lg:flex-row lg:flex-wrap lg:gap-x-10 lg:p-0">
            {/* This first condition analyse the books given by the query. in other word the books given by the filters */}
            {books && books.length ? (
              // Analyse if books match the search in the current query books
              books.filter((book) => {
                if (search) {
                  return book.title
                    .toLowerCase()
                    .includes(search.toLowerCase());
                }
                return true;
                // If the searched title was found in the books given by the filters
              }).length > 0 ? (
                books
                  .filter((book) => {
                    if (search) {
                      return book.title
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    }
                    return true;
                  })
                  .map((book) => (
                    <BookSchema
                      key={book.id}
                      author={book.author}
                      imgUrl={book.imageURL}
                      resumen={book.resumen}
                      title={book.title}
                      url={book.URL}
                      score={handleScore}
                      bookId={book.id}
                      session={session}
                      review={handleReview}
                      category={book.category}
                    />
                  ))
              ) : (
                // If the searched title was not found in the books current books given by the filters
                <div className="flex max-w-md flex-col gap-2 rounded-md bg-gray-50 p-6 text-gray-800 shadow-lg shadow-black/60">
                  <h2 className="flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide">
                    <AlertCircle className="text-red-600" />
                    No matches
                  </h2>
                  <p className="flex-1 text-gray-600">Upps...</p>
                  <p className="flex-1 text-gray-600">
                    Your search parameters or your filters not found any match.
                  </p>

                  <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row"></div>
                </div>
              )
            ) : books && !books.length ? (
              // Books not found in the filters means the array of books given by the query is empty
              <div className="flex max-w-md flex-col gap-2 rounded-md bg-gray-50 p-6 text-gray-800 shadow-lg shadow-black/60">
                <h2 className="flex items-center gap-2 text-xl font-semibold leading-tight tracking-wide">
                  <AlertCircle className="text-red-600" />
                  No matches
                </h2>
                <p className="flex-1 text-gray-600">Upps...</p>
                <p className="flex-1 text-gray-600">
                  Your search parameters or your filters not found any match.
                </p>

                <div className="mt-6 flex flex-col justify-end gap-3 sm:flex-row"></div>
              </div>
            ) : (
              // Books Loading from the query
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-red-600"></div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
