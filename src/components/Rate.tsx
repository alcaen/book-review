// Imports
// Types
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
// Icons
import { Star } from "lucide-react";
// Components
// Functionals
import { useState } from "react";
// Interface
interface RateInterface {
  child: JSX.Element;
  score: ({ bookId, score }: { bookId: string; score: number }) => void;
  bookId: string;
  session: Session;
  title: string;
}
// Component
const Rate: React.FC<RateInterface> = ({
  child,
  score,
  bookId,
  session,
  title,
}) => {
  const [stars, setStars] = useState<number>(0);
  const [hoverStars, setHoverStars] = useState<number>(0);

  return (
    <Dialog>
      <DialogTrigger asChild>{child}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rate {title}</DialogTitle>
          <DialogDescription>
            Select how many stars you want to give it.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="pl-3 text-xl font-semibold">{session.user.name}</p>
            <div className="flex w-60 justify-around lg:w-72">
              <Star
                size={30}
                className={
                  "text-yellow-500 " +
                  (hoverStars >= 1 ? "fill-yellow-400/40" : " ") +
                  (stars >= 1 && hoverStars == 0 ? "fill-yellow-400" : " ")
                }
                onMouseEnter={() => setHoverStars(1)}
                onMouseLeave={() => setHoverStars(0)}
                onClick={() => setStars(1)}
              />
              <Star
                size={30}
                className={
                  "text-yellow-500 " +
                  (hoverStars >= 2 ? "fill-yellow-400/40" : " ") +
                  (stars >= 2 && hoverStars == 0 ? "fill-yellow-400" : " ")
                }
                onMouseEnter={() => setHoverStars(2)}
                onMouseLeave={() => setHoverStars(0)}
                onClick={() => setStars(2)}
              />
              <Star
                size={30}
                className={
                  "text-yellow-500 " +
                  (hoverStars >= 3 ? "fill-yellow-400/40" : " ") +
                  (stars >= 3 && hoverStars == 0 ? "fill-yellow-400" : " ")
                }
                onMouseEnter={() => setHoverStars(3)}
                onMouseLeave={() => setHoverStars(0)}
                onClick={() => setStars(3)}
              />
              <Star
                size={30}
                className={
                  "text-yellow-500 " +
                  (hoverStars >= 4 ? "fill-yellow-400/40" : " ") +
                  (stars >= 4 && hoverStars == 0 ? "fill-yellow-400" : " ")
                }
                onMouseEnter={() => setHoverStars(4)}
                onMouseLeave={() => setHoverStars(0)}
                onClick={() => setStars(4)}
              />
              <Star
                size={30}
                className={
                  "text-yellow-500 " +
                  (hoverStars >= 5 ? "fill-yellow-400/40" : " ") +
                  (stars >= 5 && hoverStars == 0 ? "fill-yellow-400" : " ")
                }
                onMouseEnter={() => setHoverStars(5)}
                onMouseLeave={() => setHoverStars(0)}
                onClick={() => setStars(5)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogPrimitive.Close
            onClick={() => {
              score({ bookId, score: stars });
              setStars(0);
            }}
          >
            <Button> Save changes</Button>
          </DialogPrimitive.Close>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Rate;
