import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const testingRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  goodbye: publicProcedure
    .input(z.object({ text: z.string(), number: z.number() }))
    .query(({ input }) => {
      return {
        foo: `Hello ${input.text}. Nudddmber: ${input.number}`,
      };
    }),
});
