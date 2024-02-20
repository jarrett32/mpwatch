import axios from "axios";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const queryRouter = createTRPCRouter({
  getOfferUpItems: publicProcedure
    .input(z.object({ item: z.string(), city: z.string(), state: z.string() }))
    .query(async ({ input }) => {
      const url = `${process.env.NEXT_PUBLIC_PYTHON_SERVICE_URL}/search_offerup`;
      const params = {
        keyword: input.item,
        city: input.city,
        state: input.state,
      };
      try {
        const response = await axios.get(url, { params });
        return response.data;
      } catch (error) {
        throw new Error(`Error in HTTP request: ${(error as Error).message}`);
      }
    }),

  getFacebookMarketplaceItems: publicProcedure
    .input(z.object({ item: z.string(), city: z.string() }))
    .query(async ({ input }) => {
      const url = `${process.env.NEXT_PUBLIC_PYTHON_SERVICE_URL}/search_marketplace`;
      const params = { keyword: input.item, city: input.city };
      try {
        const response = await axios.get(url, { params });
        return response.data;
      } catch (error) {
        throw new Error(`Error in HTTP request: ${(error as Error).message}`);
      }
    }),

  // Todo getMarketDealsHome
});
