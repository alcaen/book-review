import { type Dispatch, type SetStateAction, useState } from "react";

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
  const [repeatPass, setRepeatPass] = useState("");
  return (
    <div className="flex max-w-md flex-col rounded-md bg-gray-900 p-6 text-gray-100 sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
        <p className="text-sm text-gray-400">
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
            <label htmlFor="name" className="mb-2 block text-sm">
              Nickname
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Leroy Jenkins"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*****"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="password" className="text-sm">
                Repeat password
              </label>
            </div>
            <input
              type="password"
              name="repeat-password"
              id="repeat-password"
              placeholder="*****"
              className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100"
              value={repeatPass}
              onChange={(e) => setRepeatPass(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="button"
              className="w-full rounded-md bg-sky-400 px-8 py-3 font-semibold text-gray-900 transition hover:scale-105"
              onClick={(e) => {
                e.preventDefault(), submit();
              }}
            >
              Sign Up
            </button>
          </div>
          <p className="px-6 text-center text-sm text-gray-400">
            Already registered?{" "}
            <a
              rel="noopener noreferrer"
              href="#"
              className="text-sky-400 hover:underline"
            >
              Sign In
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
