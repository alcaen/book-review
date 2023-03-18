import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Book, Review, User } from "@prisma/client";

interface ReviewCardProps {
  review: Review & {
    user: User;
    book: Book;
  };
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
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
        <AccordionContent className="pl-4">{review.text}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ReviewCard;
