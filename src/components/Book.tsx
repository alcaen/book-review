// Imports
// Types
import { type Session } from "next-auth";
// UI Component Primitives
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "./ui/aspect-ratio";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// Icons
import { Link, MessageCircle, Star } from "lucide-react";
// Components
import Rate from "./Rate";
import Review from "./Review";
// Functionals
import { api } from "@/utils/api";
import Image from "next/image";
import { useRouter } from "next/router";
// Interface
interface BookSchemaProps {
  bookId: string;
  title: string;
  imgUrl: string;
  author: string;
  resumen: string;
  url: string;
  score: ({ bookId, score }: { bookId: string; score: number }) => void;
  session: Session | null;
  review: ({
    bookId,
    review,
    reviewId,
  }: {
    bookId: string;
    review: string;
    reviewId?: string | undefined;
  }) => void;
  category: string;
}
// Component
const BookSchema: React.FC<BookSchemaProps> = ({
  author,
  imgUrl,
  resumen,
  title,
  url,
  score,
  bookId,
  session,
  review,
  category,
}) => {
  const router = useRouter();

  const avgScore = api.book.getScoreBook;
  const reviewNum = api.book.getNumberReviews;

  return (
    <div className="flex h-full  w-72 flex-col space-y-6 overflow-hidden rounded-lg bg-gray-50 p-6 text-gray-800 shadow-md">
      <div>
        <div className="flex w-full items-center justify-center">
          <AspectRatio ratio={5 / 7}>
            <Image
              src={imgUrl}
              alt={`Photo of ${author}`}
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
        </div>
        {/* Title */}
        <h2 className="mb-1 mt-2 text-xl font-semibold">{title}</h2>
        <p className="font-medium">{author}</p>
        <p className="text-sm">{category}</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Main plot:</AccordionTrigger>
            <AccordionContent className="h-52 overflow-y-scroll">
              {resumen}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="space-x-2">
          <a href={url} target="_blank">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Learn more abour {title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </a>
        </div>
        <div className="flex space-x-2 text-sm text-gray-600">
          <div className="flex w-10 items-center justify-center gap-1">
            <p className="font-bold">
              {avgScore.useQuery({ bookId }).data?._avg.score}
            </p>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => (session ? null : void router.push("/login"))}
                >
                  {session ? (
                    <Rate
                      child={
                        <Star className="fill-none text-yellow-500 transition hover:cursor-pointer hover:fill-yellow-300/50" />
                      }
                      title={title}
                      bookId={bookId}
                      score={score}
                      session={session}
                    />
                  ) : (
                    <Star className="fill-none text-yellow-500 transition hover:cursor-pointer hover:fill-yellow-300/50" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>Rate {title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex w-10 items-center justify-center gap-1">
            <p className="font-bold">
              {reviewNum.useQuery({ bookId }).data?._count._all}
            </p>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Review
                    child={
                      <MessageCircle className="fill-none transition hover:cursor-pointer hover:fill-cyan-200/50" />
                    }
                    title={title}
                    bookId={bookId}
                    review={review}
                    session={session}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Write a review</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSchema;
