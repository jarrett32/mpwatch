import axios from "axios";
import { z } from "zod";
import { env } from "~/env";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const baseUrl = env.API_URL;

export const queryRouter = createTRPCRouter({
  getOfferUpItems: publicProcedure
    .input(z.object({ item: z.string(), city: z.string(), state: z.string() }))
    .query(async ({ input }) => {
      const url = `${baseUrl}/offerup`;
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
      const url = `${baseUrl}/fb`;
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
