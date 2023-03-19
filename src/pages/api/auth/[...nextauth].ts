import NextAuth from "next-auth";
// Import auth options from server
import { authOptions } from "@/server/auth";

export default NextAuth(authOptions);
