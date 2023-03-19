// Imports
// Types
import { type NextPage } from "next";
// Components
import LoginForm from "@/components/LoginForm";
// Functionals
import Head from "next/head";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/router";
// Page
const Login: NextPage = () => {
  // Toaster to messages
  const { toast } = useToast();
  // States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  // Handler login
  const handleSubmit = () => {
    void signIn("credentials", { redirect: false, email, password }).then(
      (signInResponse) => {
        if (signInResponse && signInResponse.ok) {
          toast({
            title: "You have been logged in",
            description: "Redirecting to main page.",
          });
          void router.push("/");
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: String(signInResponse?.error),
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setEmail(""), setPassword("");
        }
      }
    );
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Page to login users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#e25706] to-[#9e7830]">
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          submit={handleSubmit}
        />
      </main>
    </>
  );
};

export default Login;
