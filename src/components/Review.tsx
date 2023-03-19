// Imports
// Types
import type { Book, User } from "@prisma/client";
import { type Session } from "next-auth";
// UI Component Primitives
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
// Icons
import { X } from "lucide-react";
// Components
import ReviewCard from "./ReviewCard";
// Functionals
import { Review } from "@prisma/client";
import { useState } from "react";
import { api } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/router";
// Interface
interface ReviewInterface {
  child: JSX.Element;
  bookId: string;
  session: Session | null;
  title: string;
  review: ({
    bookId,
    review,
    reviewId,
  }: {
    bookId: string;
    review: string;
    reviewId?: string | undefined;
  }) => void;
}
// Component
const Review: React.FC<ReviewInterface> = ({
  child,
  review,
  bookId,
  session,
  title,
}) => {
  const [text, setText] = useState<string>("");
  const [reviewId, setReviewId] = useState<string>("");
  const [bookReviews, setBookReviews] = useState<
    | (Review & {
        user: User;
        book: Book;
      })[]
    | undefined
  >(undefined);

  const getBookReviews = api.book.getAllReviews.useQuery(
    { bookId },
    {
      onSuccess(data) {
        if (data.length) {
          setBookReviews(data);
        }
      },
    }
  );

  const deleteReview = api.book.deleteReview.useMutation({});

  const utils = api.useContext();
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = (reviewId: string) => {
    deleteReview.mutate(
      { currentUserId: session?.user.id ? session?.user.id : "", reviewId },
      {
        async onSuccess(data, variables, context) {
          await utils.book.getAllReviews.cancel({ bookId: data.bookId });
          await utils.book.getNumberReviews.cancel({ bookId: data.bookId });
          await utils.book.getAllReviews.invalidate({ bookId: data.bookId });
          await utils.book.getNumberReviews.invalidate({ bookId: data.bookId });

          toast({
            title: `${reviewId} successfully deleted.`,
            duration: 4000,
          });
        },
        onError(error, variables, context) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
          });
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{child}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>All reviews of {title} book.</DialogTitle>
          <DialogDescription>
            <p> Here you can see all the reviews and who made it.</p>
          </DialogDescription>
        </DialogHeader>
        {bookReviews !== undefined ? (
          <div className="max-h-40 overflow-y-scroll  rounded-lg border border-gray-400 px-2">
            {bookReviews.map((review) => (
              <ReviewCard
                key={review.id}
                review={review}
                session={session}
                setReviewId={setReviewId}
                setText={setText}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="max-h-40  rounded-lg border border-gray-400 px-2">
            <div className="w-full">
              This book does not have reviews... Yet.
            </div>
          </div>
        )}
        {session ? (
          <div className="grid w-full gap-1.5">
            {reviewId ? (
              <div className="flex items-center justify-between">
                <Label htmlFor="message">Editing review: {reviewId}</Label>
                <X
                  className="text-red-600 hover:cursor-pointer hover:fill-red-500/50"
                  onClick={() => {
                    setReviewId(""), setText("");
                  }}
                />
              </div>
            ) : (
              // <Trash/>
              <Label htmlFor="message">Your review</Label>
            )}

            <Textarea
              placeholder="Type your message here."
              id="message"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </div>
        ) : (
          <div className="grid w-full gap-2">
            <Label htmlFor="message">
              You heve to Log In to write reviews.
            </Label>
            <Textarea placeholder="Type your message here." disabled={true} />
          </div>
        )}
        {session ? (
          <DialogFooter>
            <DialogPrimitive.Close
              onClick={() => {
                review({ bookId, review: text, reviewId: reviewId });
                setText("");
                setReviewId("");
              }}
            >
              {reviewId ? (
                <Button> Save changes</Button>
              ) : (
                <Button> Create review</Button>
              )}
            </DialogPrimitive.Close>
          </DialogFooter>
        ) : (
          <DialogFooter>
            <DialogPrimitive.Close>
              <Link href="/login">
                <Button>Log In</Button>
              </Link>
            </DialogPrimitive.Close>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Review;
