// Imports
// Types
import { type NextPage } from "next";
import type { GetServerSideProps } from "next";
// Components
import ChangePassForm from "@/components/ChangePassForm";
// Functionals
import Head from "next/head";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@/hooks/use-toast";
import { getServerAuthSession } from "../../server/auth";

// getServersideProps to protect route
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // get session if not session do not give anything
  const session = await getServerAuthSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

const ChangePassword: NextPage = () => {
  // Session from back so it is already loaded
  const { data: session } = useSession();
  // Toaster to messages
  const { toast } = useToast();
  // States
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  // Router to redirect
  const router = useRouter();
  // Change password mutation
  const changePass = api.authentication.changePassword.useMutation();
  // Handler to change passwword
  const handleChangePassword = () => {
    if (session) {
      changePass.mutate(
        { id: session.user.id, newPassword, password },
        {
          onSuccess(data, variables, context) {
            toast({
              title: `Password changed.`,
              description: `${
                data.name ? data.name : "Usuario"
              } changed your password.`,
              duration: 4000,
            });
            void router.push("/");
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
    }
  };
  if (session) {
    return (
      <>
        <Head>
          <title>Change Password</title>
          <meta
            name="description"
            content="Page made to change the password to another customized"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen  flex-col items-center justify-center bg-gradient-to-b from-[#e25706] to-[#9e7830] pb-10">
          <ChangePassForm
            session={session}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleChangePassword}
          />
        </main>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Change Password</title>
          <meta name="description" content="Generated by create-t3-app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen flex-row items-center justify-center bg-gradient-to-b from-[#e25706] to-[#9e7830]">
          <div className="flex w-3/4 justify-around"></div>
        </main>
      </>
    );
  }
};

export default ChangePassword;
