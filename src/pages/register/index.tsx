// Imports
// Types
import { type NextPage } from "next";
// UI Component Primitives
import { ToastAction } from "@radix-ui/react-toast";
// Components
import RegisterForm from "@/components/RegisterForm";
// Functionals
import Head from "next/head";
import { api } from "@/utils/api";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/router";
// Page
const Register: NextPage = () => {
  // Register Mutation
  const register = api.authentication.register.useMutation();
  // Toast to message
  const { toast } = useToast();
  // States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  // Router to redirect
  const router = useRouter();
  // Handler submit function
  const handleSubmit = () => {
    register.mutate(
      { email, password, name },
      {
        onSuccess(data, variables, context) {
          toast({
            title: `${data.name ? data.name : "Usuario"} joined to the gang.`,
            description:
              "Welcome to book review. Now you can interact with the platform.",
            duration: 4000,
          });
          void router.push("/login");
        },
        onError(error, variables, context) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Register</title>
        <meta name="description" content="Page to register new users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#e25706] to-[#9e7830]">
        <RegisterForm
          email={email}
          password={password}
          name={name}
          setEmail={setEmail}
          setPassword={setPassword}
          setName={setName}
          submit={handleSubmit}
        />
      </main>
    </>
  );
};

export default Register;
