// Imports
// Types
import { type NextPage } from "next";
// Components
import ResetPass from "@/components/ResetPassForm";
// Functionals
import Head from "next/head";
import { api } from "@/utils/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@/hooks/use-toast";
// Page
const ResetPassword: NextPage = () => {
  // Email state
  const [email, setEmail] = useState<string>("");
  // Toast to message
  const { toast } = useToast();
  // Router to redirect
  const router = useRouter();
  // reset password mutation
  const resertPass = api.authentication.resetPassword.useMutation();
  // Handler to reset password
  const handleReset = (email: string) => {
    resertPass.mutate(
      { email },
      {
        onSuccess(data, variables, context) {
          toast({
            title: `${
              data.email ? data.email : "Usuario"
            } succesfully changed your password.`,
            description:
              "New password was send to your email. Also check on spam",
            duration: 4000,
          });
          void router.push("/login");
        },
        onError(error, variables, context) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error.message,
          });
        },
      }
    );
  };
  return (
    <>
      <Head>
        <title>Change Password</title>
        <meta name="description" content="Page maded to change password" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen  flex-col items-center justify-center bg-gradient-to-b from-[#e25706] to-[#9e7830] pb-10">
        <ResetPass
          handleReset={handleReset}
          email={email}
          setEmail={setEmail}
        />
      </main>
    </>
  );
};

export default ResetPassword;
