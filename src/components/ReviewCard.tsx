// Imports
// Types
import type { Book, Review, User } from "@prisma/client";
import type { Session } from "next-auth";
import type { Dispatch, SetStateAction } from "react";
// UI Component Primitives
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// Icons
import { Pencil, Trash } from "lucide-react";
// Interface
interface ReviewCardProps {
  review: Review & {
    user: User;
    book: Book;
  };
  session: Session | null;
  setReviewId: Dispatch<SetStateAction<string>>;
  setText: Dispatch<SetStateAction<string>>;
  handleDelete: (reviewId: string) => void;
}
// Component
const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  session,
  setReviewId,
  setText,
  handleDelete,
}) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center justify-between gap-4 px-2">
            <Avatar>
              <AvatarImage
                src={review.user.image ? review.user.image : undefined}
                alt={review.user.name ? review.user.name : "User"}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>{review.user.name}</div>
            <div>
              {review.createdAt.toLocaleDateString() +
                " at " +
                review.createdAt.toLocaleTimeString()}
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pl-4">
          <div className="mr-2 flex items-center justify-between">
            <p>{review.text}</p>
            {session?.user.id === review.userId ? (
              <div className="flex items-center gap-x-2">
                <Trash
                  className="text-red-600 hover:cursor-pointer hover:fill-red-500/50"
                  onClick={() => handleDelete(review.id)}
                />
                <Pencil
                  className="text-gray-700 hover:cursor-pointer hover:fill-yellow-600/50"
                  onClick={() => {
                    setReviewId(review.id), setText(review.text);
                  }}
                />
              </div>
            ) : null}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ReviewCard;
