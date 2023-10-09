//microCSMと連携
import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "nextjs-beginner-microcms",
    apiKey: process.env.API_KEY,
});