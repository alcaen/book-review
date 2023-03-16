import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { hash } from "bcrypt";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        email: z.string().min(1),
        password: z.string().min(1),
        name: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (exist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already used, please try with other email.",
          cause: "Email Already Used",
        });
      } else {
        const user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            password: await hash(input.password, 10),
            name: input.name,
            image: `https://api.dicebear.com/5.x/big-smile/svg?seed=${input.name}`,
          },
          select: { id: true, email: true, name: true, image: true },
        });
        return user;
      }
    }),
});
