// Imports
// Types
import type { Session } from "next-auth";
// UI Component Primitives
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
// Icons
import { Mail } from "lucide-react";
// Interface
interface ProfileCardProps {
  session: Session;
}
// Component
const ProfileCard: React.FC<ProfileCardProps> = ({ session }) => {
  return (
    <div className="max-w-md rounded-md bg-gray-50 p-8 text-gray-800 shadow-lg shadow-black/70 sm:flex sm:space-x-6">
      <div className="mb-6 h-44 w-full flex-shrink-0 rounded-full border-2 border-t-red-600 border-b-yellow-600 border-r-cyan-600 border-l-green-600 sm:mb-0 sm:h-32 sm:w-32">
        <Avatar>
          <AvatarImage
            src={session.user.image ? session.user.image : undefined}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col space-y-4">
        <div>
          <h2 className="text-2xl font-semibold">{session.user.name}</h2>
          <span className="text-sm font-medium text-gray-700">
            Handsome User
          </span>
        </div>
        <div className="space-y-1">
          <span className="flex items-center space-x-2">
            <Mail />
            <span className="font-semibold text-gray-600">
              {session.user.email}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
