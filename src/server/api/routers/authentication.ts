// trpc error to hanlde and send erros
import { TRPCError } from "@trpc/server";
// validation and types on exteroids
import { z } from "zod";
// encrypt password
import { hash } from "bcrypt";
// router, public api route, protectted api route
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
// to generate random string recover password
import Str from "@supercharge/strings";
// env vatriables with typescript allwed thanks to zod
import { env } from "@/env.mjs";
// used to send mail
import nodemailer from "nodemailer";
// used to compare password for allow change it
import { compare } from "bcrypt";
// sendEmail function to recover password
const sendMail = ({
  newPass,
  from,
  to,
}: {
  newPass: string;
  from: string;
  to: string;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.GMAIL_NODEMAILER_EMAIL,
      pass: env.GMAIL_NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from,
    to,
    subject: "Password reset",
    text: `Your new password is: ${newPass} `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
//auth router where i handle auth options from back
export const authRouter = createTRPCRouter({
  // register new user
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
  // resert password
  resetPassword: publicProcedure
    .input(
      z.object({
        email: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.prisma.user.findUnique({
        where: { email: input.email },
      });
      if (!exist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email not found",
          cause: "Email not found",
        });
      } else {
        const newPass = Str.random(10);
        const newPassEncrypted = await hash(newPass, 10);
        const user = await ctx.prisma.user.update({
          where: { email: input.email },
          data: {
            password: newPassEncrypted,
          },
          select: { id: true, email: true, name: true, image: true },
        });

        sendMail({
          newPass,
          from: env.GMAIL_NODEMAILER_EMAIL,
          to: input.email,
        });

        return user;
      }
    }),
  // change password
  changePassword: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        password: z.string().min(1),
        newPassword: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const exist = await ctx.prisma.user.findUnique({
        where: { id: input.id },
      });
      if (!exist) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email not found",
          cause: "Email not found",
        });
      }

      const match = await compare(
        input.password,
        exist.password ? exist.password : ""
      );

      if (!match) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect Password",
          cause: "Incorrect Password",
        });
      } else {
        const user = await ctx.prisma.user.update({
          where: { id: input.id },
          data: {
            password: await hash(input.newPassword, 10),
          },
          select: { id: true, email: true, name: true, image: true },
        });
        return user;
      }
    }),
});
