import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const BlogPosts = defineCollection({
  loader: glob({ pattern: ["**/*.{md,mdx}", "!**/_*.{md,mdx}"], base: "./src/content/BlogPosts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // Transform string to Date object
      date: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      updatedDate: z
        .string()
        .optional()
        .transform((str) => (str ? new Date(str) : undefined)),
      author: z.string(),
      category: z.string(),
      type: z.string().optional(),
      cover: image(),
      attr: z
        .object({
          sourceName: z.string().optional(),
          sourceLink: z.string().optional(),
          siteName: z.string().optional(),
          siteLink: z.string().optional(),
        })
        .optional(),
      meta: z
        .object({
          rating: z.number().optional(),
          type: z.string().optional(),
          author: z.string().optional(),
          year: z.number().optional(),
        })
        .optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blogposts: BlogPosts };
