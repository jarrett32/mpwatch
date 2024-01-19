import axios from "axios";
import { spawn } from "child_process";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const queryRouter = createTRPCRouter({
  getMarketItems: publicProcedure
    .input(z.object({ item: z.string(), city: z.string(), state: z.string() }))
    .query(async ({ input }) => {
      try {
        const url = `${process.env.NEXT_PUBLIC_PYTHON_SERVICE_URL}/search_offerup`;
        const params = {
          keyword: input.item,
          city: input.city,
          state: input.state,
        };

        const response = await axios.get(url, { params });
        return response.data;
      } catch (error) {
        throw new Error(`Error in HTTP request: ${error.message}`);
      }
    }),

  // Todo getMarketDealsHome
});
