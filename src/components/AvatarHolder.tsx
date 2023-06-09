// Imports
// Types
import { type Session } from "next-auth";
// UI Component Primitives
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// Functionals
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
// Interface
interface AvatarHolderProps {
  session: Session | null;
}
// Component
const AvatarHolder: React.FC<AvatarHolderProps> = ({ session }) => {
  const router = useRouter();
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex w-full items-center justify-center gap-2 rounded-lg bg-white/90 py-1 px-2">
            <Avatar>
              <AvatarImage
                src={session.user.image ? session.user.image : undefined}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{session.user.name}</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/profile">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          {/* <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => void signOut()}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <div
      className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-white/90 py-1 px-2 transition-all hover:cursor-pointer hover:bg-white/70"
      onClick={() => void router.push("/login")}
    >
      <div>
        <p className="font-semibold">Log In</p>
      </div>
    </div>
  );
};

export default AvatarHolder;
