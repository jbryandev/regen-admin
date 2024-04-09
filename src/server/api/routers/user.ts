import { userSchema } from "@/lib/schema";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
  getUserProfile: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
      },
    });
  }),
  update: protectedProcedure
    .input(userSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: {
          ...input,
        },
      });
    }),
});
