// Imports
// Types
import type { Session } from "next-auth";
import type { Dispatch, SetStateAction } from "react";
// UI Component Primitives
import { Button } from "./ui/button";
// Functionals
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

// Interface
interface ChangePassFormProps {
  session: Session;
  setNewPassword: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  newPassword: string;
  password: string;
  handleSubmit: () => void;
}

// Component
const ChangePassForm: React.FC<ChangePassFormProps> = ({
  session,
  handleSubmit,
  newPassword,
  password,
  setNewPassword,
  setPassword,
}) => {
  const zodValidation = z.object({
    password: z.string().min(3),
    newPassword: z.string().min(3),
    confirmNewPassword: z.string().min(3),
  });

  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  return (
    <div className="flex max-w-md flex-col rounded-md bg-gray-200/95 p-6 text-gray-900 sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Change Password</h1>
        <p className="text-sm font-medium text-gray-800">
          <span className="font-bold">Logged as: </span>
          {session.user.name}
        </p>
        <p className="text-sm font-medium text-gray-800">
          <span className="font-bold">Email: </span> {session.user.email}
        </p>
      </div>
      <form
        noValidate={undefined}
        action=""
        className="ng-untouched ng-pristine ng-valid space-y-12"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-bold">
              Previous password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full rounded-md border border-gray-900 bg-gray-300 px-3 py-2 text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="password" className="text-sm font-bold">
                New password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full rounded-md border border-gray-900 bg-gray-300 px-3 py-2 text-gray-900"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="password" className="text-sm font-bold">
                Confirm password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full rounded-md border border-gray-900 bg-gray-300 px-3 py-2 text-gray-900"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <Button
              type="button"
              className="w-full"
              disabled={
                !zodValidation.safeParse({
                  newPassword,
                  password,
                  confirmNewPassword,
                }).success || !(confirmNewPassword === newPassword)
              }
              onClick={(e) => {
                e.preventDefault(), handleSubmit();
              }}
            >
              Change Password
            </Button>
          </div>
          <p className="px-6 text-center text-sm font-medium text-gray-800">
            Don{"'"}t want to change password?{" "}
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

export default ChangePassForm;
