// Imports
// Types
import type { Dispatch, SetStateAction } from "react";
// UI Component Primitives
import { Button } from "./ui/button";
// Functionals
import Link from "next/link";
import { z } from "zod";
// Interface
interface ResetPassProps {
  handleReset: (email: string) => void;
  setEmail: Dispatch<SetStateAction<string>>;
  email: string;
}
// Component
const ResetPass: React.FC<ResetPassProps> = ({
  handleReset,
  email,
  setEmail,
}) => {
  const zodValidation = z.object({ email: z.string().email() });

  return (
    <div className="flex max-w-md flex-col rounded-md bg-gray-200/95 p-6 text-gray-900 sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Reset Password</h1>
      </div>
      <form
        noValidate={undefined}
        action=""
        className="ng-untouched ng-pristine ng-valid space-y-6"
      >
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-bold">
            Email address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="leroy@jenkins.com"
            className="w-full rounded-md border border-gray-900 bg-gray-300 px-3 py-2 text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <div>
            <Button
              type="button"
              className="w-full"
              disabled={!zodValidation.safeParse({ email }).success}
              onClick={(e) => {
                e.preventDefault(), handleReset(email);
              }}
            >
              Reset Password
            </Button>
          </div>
          <p className="px-6 text-center text-sm font-medium text-gray-800">
            Don{"'"}t want to reset your password?{" "}
            <Link
              rel="noopener noreferrer"
              href="/"
              className="text-sky-500 hover:underline"
            >
              Return home
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default ResetPass;
