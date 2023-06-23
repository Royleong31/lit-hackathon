/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MessageType } from "types/Message";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { makeChain } from "../../../ai/make-chain";
import { pinecone } from "../../../ai/pinecone-client";
import { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE } from "../../../ai/pinecone";
import { writeFile, readFile } from "fs/promises";
import { ingestFile } from "~/utils/ingest-file";
import pdfParse from "pdf-parse";

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

      try {
        await writeFile(`uploadedDocs/${name}`, pdfString as string, "base64");

        const index = pinecone.Index(PINECONE_INDEX_NAME);

        await ingestFile(name);

        const vectorStore = await PineconeStore.fromExistingIndex(
          new OpenAIEmbeddings({}),
          {
            pineconeIndex: index,
            textKey: "text",
            namespace: PINECONE_NAME_SPACE, //namespace comes from your config folder
          }
        );

        const readFileSync = await readFile(`uploadedDocs/${name}`);
        let pdfExtract = await pdfParse(readFileSync);
        const title = pdfExtract.text.slice(0, 100).replace("\n", " ");
        console.log(title);
        //create chain
        const chain = makeChain(vectorStore);
        //Ask a question using chat history
        const response = await chain.call({
          question: `Summarise the article about ${title}`,
          chat_history: [],
        });

        return { response, error: null };
      } catch (error: any) {
        return {
          response: null,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          error: error?.message ?? "Something went wrong",
        };
      }
    }),
});

//"\n\n[2011]1 SLRSINGAPORE LAW REPORTS737\nTo h   S e o k   K h e n g   \nv \nHuang Huiqun\n[2010] SGHC 308"
