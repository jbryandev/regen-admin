import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  findUserByEmail: protectedProcedure
    .input(z.object({ email: z.string().email() }))
    .query(({ ctx, input }) => {
      console.log(input.email);
      return ctx.db.user.findFirst({
        where: { email: input.email },
      });
    }),
});
