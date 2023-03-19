// Imports
// Types
import { type NextPage } from "next";
import type { GetServerSideProps } from "next";
// UI Component Primitives
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
// Icons
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
// Components
import ProfileCard from "@/components/ProfileCard";
// Functionals
import { useSession } from "next-auth/react";
import Link from "next/link";
import Head from "next/head";
import { getServerAuthSession } from "../../server/auth";
// getServersideProps to get session from server side
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // get session if not session do not give anything and redirect to home
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
// Page
const Profile: NextPage = () => {
  // Session from back so it is already loaded
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Head>
          <title>Profile</title>
          <meta name="description" content="Profile of your account" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="flex min-h-screen  flex-col items-center justify-center bg-gradient-to-b from-[#e25706] to-[#9e7830] pb-10">
          <div className="m-5 my-10 flex w-72 flex-col items-center justify-center gap-2 rounded-xl bg-white/70 p-4 lg:w-96">
            <h1 className="text-2xl font-semibold">This is your profile</h1>
            <p className="text-center">
              As well mine. With all my social media.
            </p>
            <p className="text-center">
              By the way this route is protected with{" "}
              <span className="font-semibold">getServerSideProps</span> that
              means it only shows if you{"'"}re authenticated. And the
              validation is made on serverside thanks to{" "}
              <span className="font-semibold">NextJs</span>
            </p>
          </div>
          <div className="flex  w-3/4 flex-col justify-around gap-y-20 lg:flex-row lg:gap-y-0">
            <ProfileCard session={session} />
            <div className="flex flex-col items-center justify-center gap-y-5">
              <Link
                href="/"
                className="flex w-full items-center justify-center"
              >
                <Button className="w-full lg:w-52">Go Home</Button>
              </Link>
              <Link
                href="/pass_change"
                className="flex w-full items-center justify-center"
              >
                <Button className="w-full lg:w-52">Change Password</Button>
              </Link>
            </div>

            <div className="max-w-md rounded-md bg-gray-50 p-8 text-gray-800 shadow-lg shadow-black/70 sm:flex sm:space-x-6">
              <div className="mb-6 h-44 w-full flex-shrink-0 rounded-full border-2 border-t-red-600 border-b-yellow-600 border-r-cyan-600 border-l-green-600 sm:mb-0 sm:h-32 sm:w-32">
                <Avatar>
                  <AvatarImage
                    className="rounded-full"
                    src={"https://avatars.githubusercontent.com/u/64233636?v=4"}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">Alcaen</h2>
                  <span className="text-sm font-medium text-gray-700">
                    Developer
                  </span>
                </div>
                <div className="space-y-2">
                  <a href="mailto:alcaen.dev@gmail.com?Subject=Contact%20Alcaen%20From%20Book%Review%Project">
                    <span className="group flex items-center space-x-2">
                      <Mail className="text-red-500 group-hover:fill-red-500/30" />
                      <span className="font-semibold text-gray-600">
                        alcaen.dev@gmail.com
                      </span>
                    </span>
                  </a>
                  <div className="flex items-center justify-center space-x-4">
                    <Link
                      target="_blank"
                      href="https://www.linkedin.com/in/alcaen/"
                    >
                      <Linkedin className="text-blue-600  hover:fill-blue-600/50" />
                    </Link>
                    <Link target="_blank" href="https://github.com/alcaen">
                      <Github className="hover:fill-black/50" />
                    </Link>
                    <Link
                      target="_blank"
                      href="https://twitter.com/alejocaicedosac"
                    >
                      <Twitter className="text-cyan-500 hover:fill-cyan-500/50" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Create T3 App</title>
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

export default Profile;
