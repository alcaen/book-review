import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { api } from "../utils/api";
import { Toaster } from "@/components/ui/toaster";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    // Session wrapper to acces session if needed
    <SessionProvider session={session}>
      {/* theme provider used if we want to add themes like dark and light not used in this app all is setted to light but is confirured as well*/}
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
