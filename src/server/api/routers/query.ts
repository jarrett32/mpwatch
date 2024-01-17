import { z } from "zod";

import { spawn } from "child_process";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const queryRouter = createTRPCRouter({
  getMarketItems: publicProcedure
    .input(z.object({ item: z.string() }))
    .query(({ input }) => {
      return new Promise((resolve, reject) => {
        const process = spawn("python3", [
          "scripts/offerup_scraper.py",
          input.item,
        ]);

        let dataChunks: Buffer[] = [];

        process.stdout.on("data", (chunk: Buffer) => {
          dataChunks.push(chunk);
        });

        process.stdout.on("end", () => {
          try {
            const result = JSON.parse(Buffer.concat(dataChunks).toString());
            resolve({ result });
          } catch (error) {
            reject(`Error parsing JSON: ${error.message}`);
          }
        });

        process.stderr.on("data", (data) => {
          reject(`Error in Python script: ${data.toString()}`);
        });
      });
    }),

  // Todo getMarketDealsHome
});
