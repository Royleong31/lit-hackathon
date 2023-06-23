import { MessageType } from "types/Message";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { makeChain } from "../../../ai/make-chain";
import { pinecone } from "../../../ai/pinecone-client";
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from "../../../ai/pinecone";
import { writeFile } from "fs/promises";

export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(
      z.object({
        prompt: z.string(),
        type: z.nativeEnum(MessageType),
        history: z.array(z.tuple([z.string(), z.string()])), // !: Matches ChatHistory type
      })
    )
    .mutation(async ({ input }) => {
      console.log("hello");
      const { type, history, prompt } = input;
      console.log(input);

      // TODO: Categorise based type of prompt

      const sanitisedQuestion = prompt.trim().replaceAll("\n", " ");
      try {
        const index = pinecone.Index(PINECONE_INDEX_NAME);

        /* create vectorstore*/
        const vectorStore = await PineconeStore.fromExistingIndex(
          new OpenAIEmbeddings({}),
          {
            pineconeIndex: index,
            textKey: "text",
            namespace: PINECONE_NAME_SPACE, //namespace comes from your config folder
          }
        );

        //create chain
        const chain = makeChain(vectorStore);
        //Ask a question using chat history
        const response = await chain.call({
          question: sanitisedQuestion,
          chat_history: history || [],
        });

        console.log("response", response);

        return { response, error: null };
      } catch (error: unknown) {
        return {
          error: (error as Error)?.message || "Something went wrong",
          response: null,
        };
      }
    }),

  uploadFile: publicProcedure
    .input(z.object({ file: z.string(), name: z.string() }))
    .mutation(async ({ input }) => {
      const { file, name } = input;
      const pdfString = file.split("base64,")[1];

      await writeFile(
        `uploadedDocs/${name}.pdf`,
        pdfString as string,
        "base64"
      );
      return { response: "ok", error: null };
    }),
});
