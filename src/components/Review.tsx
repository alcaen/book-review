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

import { Star } from "lucide-react";
import { type Session } from "next-auth";
import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import ReviewCard from "./ReviewCard";
import { api } from "@/utils/api";
import type { Book, Review, User } from "@prisma/client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "./ui/label";
import Link from "next/link";
import { Textarea } from "./ui/textarea";

export default function Review({
  child,
  review,
  bookId,
  session,
  title,
}: {
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
}) {
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
              <ReviewCard key={review.id} review={review} />
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
            <Label htmlFor="message">Your review</Label>
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
              }}
            >
              <Button> Save changes</Button>
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
}
