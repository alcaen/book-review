import { Check, Info, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { type Dispatch, type SetStateAction, useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";

interface RegisterFormProps {
  email: string;
  password: string;
  name: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  setName: Dispatch<SetStateAction<string>>;
  submit: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  email,
  name,
  password,
  setEmail,
  setName,
  setPassword,
  submit,
}) => {
  const router = useRouter();
  const [repeatPass, setRepeatPass] = useState("");

  const zodValidation = z.object({
    email: z.string().email().min(1),
    name: z.string().min(1),
    password: z.string().min(3),
    repPassword: z.string().min(3),
  });

  return (
    <div className="flex max-w-md flex-col rounded-md bg-gray-200/95 p-6 text-gray-800  sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        <p className="text-sm font-medium text-gray-800">
          Sign up to create your own account
        </p>
      </div>
      <form
        noValidate={undefined}
        action=""
        className="ng-untouched ng-pristine ng-valid space-y-12"
      >
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-bold">
              Nickname
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Leroy Jenkins"
              className="w-full rounded-md border border-gray-800 bg-gray-200 px-3 py-2 text-gray-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-bold">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full rounded-md border border-gray-800 bg-gray-200 px-3 py-2 text-gray-800"
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
            <div className="flex items-center justify-between gap-1 transition">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full rounded-md border border-gray-800 bg-gray-200 px-3 py-2 text-gray-800"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {repeatPass === password && password !== "" ? (
                <Check className="text-green-600" />
              ) : password === "" ? (
                <Info />
              ) : (
                <X className="text-red-600" />
              )}
            </div>
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="password" className="text-sm font-bold">
                Repeat password
              </label>
            </div>
            <div className="flex items-center justify-between gap-1 transition">
              <input
                type="password"
                name="repeat-password"
                id="repeat-password"
                placeholder="*****"
                className="w-full rounded-md border border-gray-800 bg-gray-200 px-3 py-2 text-gray-800"
                value={repeatPass}
                onChange={(e) => setRepeatPass(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <Button
              type="button"
              className="w-full"
              onClick={(e) => {
                e.preventDefault(), submit();
              }}
              disabled={
                !zodValidation.safeParse({
                  email,
                  name,
                  password,
                  repPassword: repeatPass,
                }).success || password !== repeatPass
              }
            >
              Sign Up
            </Button>
          </div>
          <p className="px-6 text-center text-sm font-semibold text-gray-800">
            Already registered?{" "}
            <Link
              rel="noopener noreferrer"
              href="/login"
              className="text-sky-500 hover:underline"
            >
              Sign In
            </Link>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
