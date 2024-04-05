import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const roleRouter = createTRPCRouter({
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.role.findMany();
  }),
});
