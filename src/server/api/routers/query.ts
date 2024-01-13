import { z } from "zod";

import { spawn } from "child_process";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const queryRouter = createTRPCRouter({
  getMarketItems: publicProcedure
    .input(z.object({ item: z.string() })) // Assuming 'item' as input for the Python script
    .query(({ input }) => {
      return new Promise((resolve, reject) => {
        // Replace 'path/to/your_script.py' with the actual path to your Python script
        // and ensure 'input.item' is passed correctly to your script
        // const pythonProcess = spawn("python", [
        //   "path/to/your_script.py",
        //   input.item,
        // ]);

        // let result = "";

        // pythonProcess.stdout.on("data", (data) => {
        //   result += data.toString();
        // });

        // pythonProcess.stderr.on("data", (data) => {
        //   console.error(`stderr: ${data}`);
        //   reject(new Error(`Error in Python script execution: ${data}`));
        // });

        // pythonProcess.on("close", (code) => {
        //   if (code !== 0) {
        //     console.log(`Python script exited with code ${code}`);
        //     reject(new Error(`Python script exited with code ${code}`));
        //   } else {
        //     resolve({ result });
        //   }
        // });
        const queryItemOne = {
          item: "iphone",
          price: "100",
          city: {
            name: "San Diego",
            country: "USA",
          },
          market: "offerup",
          link: "https://offerup.com/",
        };
        resolve({ result: [queryItemOne] });
      });
    }),
});
