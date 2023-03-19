// Imports
// Types
import type { Dispatch, SetStateAction } from "react";
// UI Component Primitives
import { Button } from "./ui/button";
// Functionals
import Link from "next/link";
import { z } from "zod";
// Interface
interface LoginFormProps {
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  submit: () => void;
}
// Component
const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  submit,
}) => {
  const zodValidation = z.object({
    email: z.string().email().min(1),
    password: z.string().min(3),
  });

  return (
    <div className="flex max-w-md flex-col rounded-md bg-gray-200/95 p-6 text-gray-900 sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign In</h1>
        <p className="text-sm font-medium text-gray-800">
          Sign In to interact with the application
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
          <div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="password" className="text-sm font-bold">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full rounded-md border border-gray-900 bg-gray-300 px-3 py-2 text-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-2 text-left text-sm font-medium text-gray-800">
              Forgot password?{" "}
              <Link
                rel="noopener noreferrer"
                href="/reset_pass"
                className="text-sky-500 hover:underline"
              >
                Reset it
              </Link>
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <Button
              type="button"
              className="w-full"
              disabled={!zodValidation.safeParse({ email, password }).success}
              onClick={(e) => {
                e.preventDefault(), submit();
              }}
            >
              Log In
            </Button>
          </div>
          <p className="px-6 text-center text-sm font-medium text-gray-800">
            Don{"'"}t have an account?{" "}
            <Link
              rel="noopener noreferrer"
              href="/register"
              className="text-sky-500 hover:underline"
            >
              Sign Up
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
