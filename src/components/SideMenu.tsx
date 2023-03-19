// Imports
// Types
import { type Session } from "next-auth";
import type { Dispatch, SetStateAction } from "react";
// UI Component Primitives
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
// Icons
import { SidebarOpen } from "lucide-react";
// Components
import AvatarHolder from "./AvatarHolder";
import Filters from "./Filters";
// Functionals
// Interface
interface SideMenuProps {
  session: Session | null;
  setCurrentCategory: Dispatch<SetStateAction<string | undefined>>;
  setCurrentAuthor: Dispatch<SetStateAction<string | undefined>>;
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
}
// Component
const SideMenu: React.FC<SideMenuProps> = ({
  session,
  setCurrentAuthor,
  setCurrentCategory,
  search,
  setSearch,
}) => {
  return (
    <Accordion
      type="single"
      collapsible
      className=" w-screen bg-white/90 lg:w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex items-center justify-center">
          <SidebarOpen />
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex min-h-full flex-col gap-5  p-5">
            <AvatarHolder session={session} />

            <Filters
              setCurrentCategory={setCurrentCategory}
              setCurrentAuthor={setCurrentAuthor}
            />
            <div className="flex flex-col gap-y-4 rounded-md bg-white p-4">
              <Label className="font-semibold">Search</Label>
              <Input
                placeholder="Searching for some book?"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SideMenu;
