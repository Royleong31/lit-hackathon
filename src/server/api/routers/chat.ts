import { MessageType } from "types/Message";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
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
        foo: `Hello ${input.text}. Number: ${input.number}`,
      };
    }),

  sendMessage: publicProcedure
    .input(z.object({ text: z.string(), type: z.nativeEnum(MessageType) }))
    .mutation(async ({ input }) => {
      console.log("hello");
      const { text, type } = input;
      await sleep(1000);

      return {
        response: `Hello ${text}, of message type: ${type}`,
      };
    }),
});

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
